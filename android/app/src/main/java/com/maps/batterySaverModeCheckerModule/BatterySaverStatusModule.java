package com.maps.batterySaverModeCheckerModule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BatterySaverStatusModule extends ReactContextBaseJavaModule {

    public static final String NAME = "BatterySaverStatusModule";
    public static final String EVENT_NAME = "BatterySaverEventChanged";
    BroadcastReceiver batterySaverReceiver=null;

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @ReactMethod
    public String getEventName() {      //method to get the event name rather then hardcoding on JS side
        return EVENT_NAME;
    }

    public BatterySaverStatusModule(ReactApplicationContext context){
        super(context);
        registerBatterySaverReceiver(context);
    }

    @ReactMethod
    private void registerBatterySaverReceiver(ReactApplicationContext reactContext) {

        batterySaverReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (intent.getAction().equals(PowerManager.ACTION_POWER_SAVE_MODE_CHANGED)) {
                    boolean isBatterySaverMode = false;
                    isBatterySaverMode = checkBatterySaverMode(context);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(EVENT_NAME, isBatterySaverMode);
                }
            }
        };

        IntentFilter filter = new IntentFilter(PowerManager.ACTION_POWER_SAVE_MODE_CHANGED);
        reactContext.registerReceiver(batterySaverReceiver, filter);
    }
    @ReactMethod
    private boolean checkBatterySaverMode(Context context) {
        boolean isBatterySaverMode = false;
        PowerManager powerManager = (PowerManager) getReactApplicationContext().getSystemService(Context.POWER_SERVICE);
        try {
            IntentFilter filter = new IntentFilter(PowerManager.ACTION_POWER_SAVE_MODE_CHANGED);
            Intent batteryStatus = context.registerReceiver(null, filter);

                isBatterySaverMode = powerManager.isPowerSaveMode();
                System.out.println("Power saver mode is "+powerManager.isPowerSaveMode());

        } catch (Exception e) {
            Log.e("YAY!! error called", "Error checking battery saver mode: " + e.getMessage());
        }

        return isBatterySaverMode;
    }

    @Override
    public void onCatalystInstanceDestroy() {

        super.onCatalystInstanceDestroy();
        if (batterySaverReceiver != null) {
            try {
                getReactApplicationContext().unregisterReceiver(batterySaverReceiver);
                System.out.println("I am unregistered");
            } catch (Exception e) {
                // Handle exception if necessary
            }
        }
    }
}
