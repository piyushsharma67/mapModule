import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import useMapScreenHook from '../viewController/useMapScreen';
import Svg, { Marker as SvgMarker, Path } from 'react-native-svg';
import Loader from '../../../components/loader/Loader';

function MapScreen() {

    const {
        loading,
        initialLocation,
        polylineCoordinates,
        arrowPosition,
        setMapView,
        calculateBearing
    } = useMapScreenHook()



    return (
        <View style={style.container}>
            <Loader loading={loading} />
            <MapView
                style={style.container}
                initialRegion={initialLocation}
                ref={setMapView}
            >
                <Polyline coordinates={polylineCoordinates} strokeWidth={3} strokeColor='red' />

                {arrowPosition.map((index, arrowIndex) => {
                    if (index < polylineCoordinates.length - 1) {
                        const bearing = calculateBearing(polylineCoordinates[index], polylineCoordinates[index + 1]);
                        console.log("bearing is", bearing)
                        return (
                            <Marker
                                key={index}
                                coordinate={polylineCoordinates[index]}
                                anchor={{ x: 0.5, y: 0.5 }}
                                rotation={0}
                            >
                                <Svg
                                    width={20}
                                    height={20}
                                    style={{ transform: [{ rotate: `${bearing}deg` }] }}
                                >
                                    <Path
                                        d="M0 0 L10 20 L20 0 Z"
                                        fill="red" // Replace with your desired color
                                    />
                                </Svg>
                            </Marker>
                        );
                    }
                    return null;
                })}
            </MapView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    }
})

export default MapScreen