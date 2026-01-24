import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import "../global.css"

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default Index