import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useCategoryStore } from "@/store/useCategoryStore";
import { NameInputDialog } from "./NameInputDialog";
import { IconPickerModal } from "./IconPickerModal";
import { ColorPickerModal } from "./ColorPickerModal";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CreateCategorySheet = ({ onClose }: { onClose: () => void }) => {
 const [isSubmitting, setIsSubmitting] = useState(false);
  const { editingCategory, saveCategory } = useCategoryStore();
  const translateY = useSharedValue(SCREEN_HEIGHT);

  // Form Local States
  const [title, setTitle] = useState(editingCategory?.title || "New category");
  const [icon, setIcon] = useState(editingCategory?.icon || "medkit");
  const [color, setColor] = useState(editingCategory?.color || "#818CF8");

  //  Visibility States
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
     setIsSubmitting(true)
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
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}
        onPress={handleClose}
      />
      <Animated.View
        style={animatedStyle}
        className="bg-[#1C1C1E] p-8 rounded-t-[40px] absolute bottom-0 left-0 right-0 h-[65%]"
      >
        <View className="w-12 h-1.5 bg-gray-700 rounded-full self-center mb-6" />

        <View className="flex-row justify-between items-center mb-10">
          <Text className="text-white text-xl font-bold">
            {editingCategory ? "Edit Category" : "New Category"}
          </Text>
          <View
                style={{ backgroundColor: `${color}60` }}
                className="w-16 h-16 rounded-[16px] items-center justify-center mb-2"
              >
               <Ionicons name={icon as any} size={28} color="black" />
              </View>
        </View>

        <View className="space-y-1">
          <OptionItem
            icon="pencil"
            label="Category name"
            value={title}
            onPress={() => setShowNameDialog(true)}
          />
          <OptionItem
            icon="apps"
            label="Category icon"
            onPress={() => setShowIconModal(true)}
          />
          <OptionItem
            icon="water"
            label="Category color"
            onPress={() => setShowColorModal(true)}
          />
        </View>


        <TouchableOpacity
          onPress={handleFinalSave}
          disabled={isSubmitting}
          activeOpacity={0.8}
          className={`mt-auto py-4 rounded-2xl items-center mb-6 shadow-lg ${
            isSubmitting ? "bg-[#818CF8]/70" : "bg-[#818CF8]"
          }`}
        >
          {isSubmitting ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="white" />
              <Text className="text-white font-bold ml-2">Saving...</Text>
            </View>
          ) : (
            <Text className="text-white font-bold text-lg tracking-widest uppercase">
              {editingCategory ? "Update" : "Create"} Category
            </Text>
          )}
        </TouchableOpacity>

        <NameInputDialog
          visible={showNameDialog}
          value={title}
          onConfirm={setTitle}
          onClose={() => setShowNameDialog(false)}
        />
        <IconPickerModal
          visible={showIconModal}
          onSelect={(i: any) => {
            setIcon(i);
            setShowIconModal(false);
          }}
          onClose={() => setShowIconModal(false)}
        />
        <ColorPickerModal
          visible={showColorModal}
          onSelect={(c: any) => {
            setColor(c);
            setShowColorModal(false);
          }}
          onClose={() => setShowColorModal(false)}
        />
      </Animated.View>
    </View>
  );
};

const OptionItem = ({ icon, label, value, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-5 border-b border-gray-800/50"
  >
    <Ionicons name={icon} size={22} color="white" />
    <Text className="text-gray-400 ml-4 flex-1 font-medium">{label}</Text>
    {value && <Text className="text-white font-bold mr-2">{value}</Text>}
    <Ionicons name="chevron-forward" size={16} color="#4B5563" />
  </TouchableOpacity>
);

export default CreateCategorySheet;
