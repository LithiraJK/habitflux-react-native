import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CategoryItem = ({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="items-center mb-8"
    style={{ width: "25%" }}
  >
    <View
      style={{ backgroundColor: `${item.color}50` }}
      className="w-20 h-20 rounded-[16px] items-center justify-center mb-2"
    >
      <Ionicons name={item.icon as any} size={36} color={item.color} />
    </View>

    <Text
      className="text-white text-[10px] font-bold text-center px-1"
      numberOfLines={1}
    >
      {item.title}
    </Text>

    {/* <Text className="text-gray-500 text-[9px] mt-0.5">
      {item.entries || 0} entries
    </Text> */}
  </TouchableOpacity>
);

export default CategoryItem;
