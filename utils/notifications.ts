import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  message?: string
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};


export const showConfirmation = (
  title: string,
  message: string,
  onConfirm: () => void,
  confirmText: string = "OK",
  isDestructive: boolean = false
) => {
  Alert.alert(
    title,
    message,
    [
      { text: "Cancel", style: "cancel" },
      { 
        text: confirmText, 
        style: isDestructive ? "destructive" : "default", 
        onPress: onConfirm 
      }
    ],
    { cancelable: true }
  );
};