import Toast from 'react-native-toast-message';

export const displayMessage = (type, header, title, position) => {
  Toast.show({
    type: type,
    text1: header,
    text2: title,
    position: position ?? 'bottom',
  });
};
