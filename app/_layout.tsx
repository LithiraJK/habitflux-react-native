
import { View} from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LoaderProvider from '@/context/LoaderContext'
import AuthProvider from '@/context/AuthContext'

const RootLayout = () => {
    const insets = useSafeAreaInsets();

  return (
    <LoaderProvider>
      <AuthProvider>
        <View className="flex-1" style={{ marginTop: insets.top }}>
          {/* Slot renders the currently active screen */}
          <Slot />
        </View>
      </AuthProvider>
    </LoaderProvider>
  )
}

export default RootLayout