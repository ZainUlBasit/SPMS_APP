import Toast from "react-native-toast-message";

export const showSuccessToast = (msg) => {
  return Toast.show({
    type: "success",
    text1: msg,
  });
};

export const showErrorToast = (msg) => {
  return Toast.show({
    type: "error",
    text1: msg,
  });
};

export const showInfoToast = (msg) => {
  return Toast.show({
    type: "info",
    text1: msg,
  });
};
