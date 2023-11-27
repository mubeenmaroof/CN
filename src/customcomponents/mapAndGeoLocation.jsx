// LocationMap.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { Input } from './input';

function LocationMap() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    /* useEffect(() => {
         check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
             if (result === 'denied') {
                 request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((requestResult) => {
                     if (requestResult === 'granted') {
                         getCurrentLocation();
                     }
                 });
             } else if (result === 'granted') {
                 getCurrentLocation();
             }
         });
     }, []);*/

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude || 37.7749,
                    longitude: location.longitude || -122.4194,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location.latitude && location.longitude && (
                    <Marker coordinate={location} title="Your Location" />
                )}
            </MapView>
            <View style={styles.textInp}>
                <Input
                    placeholder="Latitude"
                    value={location.latitude ? location.latitude.toString() : ''}
                    editable={true}
                />
                <Input
                    placeholder="Longitude"
                    value={location.longitude ? location.longitude.toString() : ''}
                    editable={true}
                />
            </View>
        </View>
    );
};
export { LocationMap };

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        alignItems: 'center',
        width: 450,
        height: 400
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    textInp: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        width: '70%',
        height: '25%',


    }
});




