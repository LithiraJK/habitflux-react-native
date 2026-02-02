import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
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
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}
        onPress={handleClose}
      />
      <Animated.View
        style={animatedStyle}
        className="rounded-t-[40px] absolute bottom-0 left-0 right-0 h-[65%]"
      >
        <View
          style={{ backgroundColor: Colors.dark.cardBackgroundSecondary}}
          className="p-8 flex-1 rounded-t-[40px]"
        >
          <View className="w-12 h-1.5 bg-gray-700 rounded-full self-center mb-6" />

          <View className="flex-row justify-between items-center mb-10">
            <Text
              style={{ color: Colors.dark.text }}
              className="text-xl font-bold"
            >
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
            style={{
              backgroundColor: isSubmitting
                ? `${Colors.dark.primary}70`
                : Colors.dark.primary,
            }}
            className="mt-auto py-4 rounded-2xl items-center mb-6 shadow-lg"
          >
            {isSubmitting ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color={Colors.dark.text} />
                <Text
                  style={{ color: Colors.dark.text }}
                  className="font-bold ml-2"
                >
                  Saving...
                </Text>
              </View>
            ) : (
              <Text
                style={{ color: Colors.dark.text }}
                className="font-bold text-lg tracking-widest uppercase"
              >
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
        </View>
      </Animated.View>
    </View>
  );
};

const OptionItem = ({ icon, label, value, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-5 border-b border-gray-800/50"
  >
    <Ionicons name={icon} size={22} color={Colors.dark.text} />
    <Text
      style={{ color: Colors.dark.textSecondary }}
      className="ml-4 flex-1 font-medium"
    >
      {label}
    </Text>
    {value && (
      <Text style={{ color: Colors.dark.text }} className="font-bold mr-2">
        {value}
      </Text>
    )}
    <Ionicons
      name="chevron-forward"
      size={16}
      color={Colors.dark.textTertiary}
    />
  </TouchableOpacity>
);

export default CreateCategorySheet;
