import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ColorPickerModal } from "./ColorPickerModal";
import { IconPickerModal } from "./IconPickerModal";
import { NameInputDialog } from "./NameInputDialog";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CreateCategorySheet = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { editingCategory, saveCategory } = useCategoryStore();
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const [title, setTitle] = useState(editingCategory?.title || "New category");
  const [icon, setIcon] = useState(editingCategory?.icon || "medkit");
  const [color, setColor] = useState(
    editingCategory?.color || Colors.dark.primary,
  );

  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const handleFinalSave = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await saveCategory({ title, icon, color });
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () =>
      runOnJS(onClose)(),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill} className="z-50">
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)" }}
        onPress={handleClose}
      />
      <Animated.View
        style={animatedStyle}
        className="absolute bottom-0 left-0 right-0 h-[68%]"
      >
      
        <BlurView 
            intensity={40} 
            tint="dark" 
            className="flex-1 rounded-t-[48px] overflow-hidden border-t border-x border-white/10"
            style={{ backgroundColor: '#0f172aee' }}
        >
          <View className="p-8 flex-1">
          
            <View className="w-12 h-1.5 bg-white/20 rounded-full self-center mb-8" />

            <View className="flex-row justify-between items-center mb-10">
              <View>
                <Text className="text-indigo-400 text-[10px] uppercase tracking-[3px] font-black mb-1">
                    {editingCategory ? "Management" : "Configuration"}
                </Text>
                <Text style={{ color: Colors.dark.text }} className="text-3xl font-black">
                  {editingCategory ? "Edit Category" : "New Category"}
                </Text>
              </View>
              
            
              <View
                style={{ 
                    backgroundColor: `${color}20`,
                    borderColor: `${color}40`,
                    shadowColor: color,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8
                }}
                className="w-16 h-16 rounded-[24px] items-center justify-center border"
              >
                <Ionicons name={icon as any} size={28} color={color} />
              </View>
            </View>

            <View className="space-y-2">
              <OptionItem
                icon="pencil-outline"
                label="Name"
                value={title}
                onPress={() => setShowNameDialog(true)}
              />
              <OptionItem
                icon="apps-outline"
                label="Icon"
                onPress={() => setShowIconModal(true)}
              />
              <OptionItem
                icon="color-palette-outline"
                label="Theme Color"
                onPress={() => setShowColorModal(true)}
              />
            </View>

          
            <TouchableOpacity
              onPress={handleFinalSave}
              disabled={isSubmitting}
              activeOpacity={0.8}
              style={{
                backgroundColor: isSubmitting ? "#1e293b" : Colors.dark.primary,
                shadowColor: Colors.dark.primary,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15
              }}
              className="mt-auto py-5 rounded-[24px] items-center mb-10"
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-black text-base uppercase tracking-widest">
                  {editingCategory ? "Update" : "Create"} Category
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

      {/* Modals */}
      <NameInputDialog
        visible={showNameDialog}
        value={title}
        onConfirm={setTitle}
        onClose={() => setShowNameDialog(false)}
      />
      <IconPickerModal
        visible={showIconModal}
        onSelect={(i: any) => { setIcon(i); setShowIconModal(false); }}
        onClose={() => setShowIconModal(false)}
      />
      <ColorPickerModal
        visible={showColorModal}
        onSelect={(c: any) => { setColor(c); setShowColorModal(false); }}
        onClose={() => setShowColorModal(false)}
      />
    </View>
  );
};

const OptionItem = ({ icon, label, value, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-5 px-4 rounded-2xl mb-2 bg-white/5 border border-white/5"
  >
    <View className="w-10 h-10 rounded-xl bg-white/5 items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#94a3b8" />
    </View>
    <Text style={{ color: Colors.dark.textSecondary }} className="flex-1 font-bold text-sm uppercase tracking-tighter">
      {label}
    </Text>
    {value && (
      <Text style={{ color: Colors.dark.text }} className="font-black mr-3">
        {value}
      </Text>
    )}
    <Ionicons name="chevron-forward" size={16} color="#334155" />
  </TouchableOpacity>
);

export default CreateCategorySheet;