import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const ICONS = [
  "pizza",
  "medkit",
  "heart",
  "walk",
  "bicycle",
  "fitness",
  "book",
  "briefcase",
];

export const IconPickerModal = ({ visible, onSelect, onClose }: any) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 bg-black/80 justify-center items-center px-10">
      <View
        style={{ backgroundColor: Colors.dark.cardBackground }}
        className="p-6 rounded-[30px] w-full border border-gray-800"
      >
        <Text
          style={{ color: Colors.dark.text }}
          className="text-center font-bold mb-6"
        >
          Select Icon
        </Text>
        <View className="flex-row flex-wrap justify-center">
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon}
              onPress={() => onSelect(icon)}
              className="p-4"
            >
              <Ionicons name={icon as any} size={30} color={Colors.dark.text} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={onClose}
          className="mt-4 pt-4 border-t border-gray-800 items-center"
        >
          <Text
            style={{ color: Colors.dark.textSecondary }}
            className="font-bold"
          >
            CLOSE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
