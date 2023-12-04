// LocationMap.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Input } from './input';

function LocationMap({ onLocationChange }) {

    const [savedLocation, setSavedLocation] = useState({ latitude: 0, longitude: 0 });
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setCurrentLocation({ latitude, longitude });
            onLocationChange({ latitude, longitude }); // Notify parent component about the initial location
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const handleMarkerDragEnd = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setCurrentLocation({ latitude, longitude });
        onLocationChange({ latitude, longitude });
    };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.latitude : '',
                    longitude: currentLocation ? currentLocation.longitude : '',
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {currentLocation && (
                    <Marker coordinate={currentLocation}
                        title="Drag Me"
                        description="Change the location"
                        draggable
                        onDragEnd={handleMarkerDragEnd} />
                )}
            </MapView>

            <View style={styles.textInp}>
                <Input
                    placeholder="Enter Latitude"
                    value={currentLocation ? currentLocation.latitude.toString() : ''}
                    editable={true}
                />
                <Input
                    placeholder="Enter Longitude"
                    value={currentLocation ? currentLocation.longitude.toString() : ''}
                    editable={true} />
            </View>
        </View >
    );
};
export { LocationMap };

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: 450,
        height: 400
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    textInp: {
        flexDirection: "row",
        width: '85%',
        height: '25%',
    }
});




