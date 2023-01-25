import Toast, { ToastPosition, ToastType } from 'react-native-toast-message';

export const displayMessage = (type: "success" | "error", header: any, title: any, position?: ToastPosition) => {
  Toast.show({
    type: type,
    text1: header,
    text2: title,
    position: position ?? 'bottom',
  });
};
