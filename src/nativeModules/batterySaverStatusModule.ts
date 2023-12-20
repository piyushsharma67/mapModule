import { NativeModules, DeviceEventEmitter } from "react-native";
import debounceFunc from "../utils/debounceFunc";

const { batterySaverStatusModule } = NativeModules;

let eventName = "BatterySaverEventChanged";
console.log("battery saver status", batterySaverStatusModule)

const batterySaverStatusModuleFunc = {
    subscribe: (listener: (isActive: boolean) => void) => {
        if (!eventName)
            eventName = batterySaverStatusModule?.getEventName();
        batterySaverStatusModule?.registerBatterySaverReceiver();

        const subscription = DeviceEventEmitter.addListener(eventName, listener);

        return () => {
            try {
                subscription.remove();
            } catch (err) {
                console.log(err);
            }
        };
    },
    batterSaverStatus: (): boolean => batterySaverStatusModule?.checkBatterySaverMode(),
}

export default batterySaverStatusModuleFunc;