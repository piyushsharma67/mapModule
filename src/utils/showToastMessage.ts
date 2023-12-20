import { ToastAndroid } from "react-native";

export const showToastWithGravity = (message: string) => {
    ToastAndroid.showWithGravity(message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
    );
};