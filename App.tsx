import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MapScreen from './src/screens/mapScreen/view/MapScreen';
import batterySaverStatusModuleFunc from './src/nativeModules/batterySaverStatusModule';
import AppBar from './src/components/appBar/AppBar';
import Icon from 'react-native-vector-icons/Ionicons'

function App() {

  const [batterySaverStatus, setBatterySaverStatus] = useState(false)

  useEffect(() => {
    setBatterySaverStatus(batterySaverStatusModuleFunc.batterSaverStatus())
    batterySaverStatusModuleFunc.subscribe(isActive => {
      setBatterySaverStatus(isActive)
    });
  }, [])

  // since the view is a single page hence segregating into 2 parts 1) battery saver status 2) mapview with polyline
  return (
    <View style={style.container}>
      <AppBar>
        <AppBar.Content title='Map Module' />
        <View style={style.statusContainer}>
          <Text style={style.statusText}>Battery Saver</Text>
          <Icon name={batterySaverStatus ? "battery-charging-outline" : "battery-full-outline"} size={20} color={batterySaverStatus ? "orange" : "green"} />
        </View>
      </AppBar>
      <MapScreen />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText: {
    color: 'black',
    fontSize: 14
  }
})

export default App