import { useEffect, useRef, useState } from "react"
import { showToastWithGravity } from "../../../utils/showToastMessage"

const apiKey = '******** your API key here *******';
const origin = '28.6692,77.4538'; // Replace with your origin coordinates default ghaziabad
const destination = '28.7041,77.1025'; // Replace with your destination coordinates default delhi

function useMapScreenHook() {

    const [initialLocation, setInitialLocation] = useState({  //in case in future you want to maintain the current location too
        latitude: 28.6609322,
        longitude: 77.4362653,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [polylineCoordinates, setPolylineCoordinates] = useState([]);
    const [arrowPosition, setArrowPosition] = useState([])
    const [loading, setLoading] = useState(false)

    const mapRef = useRef()

    function setMapView(ref: any) {
        mapRef.current = ref
    }

    useEffect(() => {
        getRoute()
    }, [])

    async function getRoute() {
        setLoading(true)

        const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

        try {
            const points = [];
            const response = await fetch(apiUrl);
            const data = await response.json()
            data.routes[0].legs[0].steps.forEach((step: any) => {
                const polyline = step.polyline.points;
                const decodedPolyline = decodePolyline(polyline);
                points.push(...decodedPolyline);
            });

            points.unshift({ latitude: initialLocation.latitude, longitude: initialLocation.longitude })

            const numberOfArrows = 4;
            const totalPoints = points.length;
            let positions = []
            for (let i = 0; i < numberOfArrows; i++) {
                const index = Math.floor((i / numberOfArrows) * (totalPoints - 1));
                positions.push(index)
            }

            //@ts-ignore
            setArrowPosition(positions)
            //@ts-ignore
            setPolylineCoordinates(points);
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            showToastWithGravity(error.message)
        }
    }

    const decodePolyline = (encoded: any) => {
        let index = 0;
        const len = encoded.length;
        const array = [];

        let lat = 0;
        let lng = 0;

        while (index < len) {
            let b;
            let shift = 0;
            let result = 0;

            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            const point = {
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            };
            array.push(point);
        }

        return array;
    };

    const calculateBearing = (coord1: any, coord2: any) => {    //this logic needs to be refined to show the actual angle 
        const lat1 = coord1.latitude;
        const lon1 = coord1.longitude;
        const lat2 = coord2.latitude;
        const lon2 = coord2.longitude;

        const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

        let bearing = Math.atan2(y, x);
        bearing = (bearing * 180) / Math.PI;
        return bearing;
    };


    return {
        loading,
        initialLocation,
        polylineCoordinates,
        arrowPosition,
        setMapView,
        calculateBearing
    }
}

export default useMapScreenHook