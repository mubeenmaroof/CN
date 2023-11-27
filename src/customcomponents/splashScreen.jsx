// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../utils/theme';

function SplashScreen({ navigation }) {
    useEffect(() => {
        // Simulate an asynchronous task, e.g., loading resources
        const fakeAsyncTask = setTimeout(() => {
            // Navigate to the main app screen after the task is completed
            navigation.replace('SigninPage');
        }, 5000); // 3000 milliseconds (3 seconds)

        // Clear the timeout if the component is unmounted (cleanup)
        return () => clearTimeout(fakeAsyncTask);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/Animation/CN2.lottie.json')}
                autoPlay
                loop={false}
                style={styles.animation}


            />
        </View>
    );
};
export { SplashScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    animation: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF4000',
        resizeMode: 'contain'
    },
});


