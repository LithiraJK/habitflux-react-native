import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { logout } from '@/services/authService'
import { router } from 'expo-router'


const Home = () => {
  const handleLogout = async () => {
    await logout()
    router.replace('/login')
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Today</Text>
      <Pressable className='bg-red-600 px-6 py-3 rounded-2xl' onPress={handleLogout}>
        <Text className="text-white text-lg text-center">LogOut</Text>
      </Pressable>
    </View>
  )
}

export default Home
