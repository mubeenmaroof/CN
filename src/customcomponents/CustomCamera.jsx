import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useEffect, useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


function CustomCamera({ show, onClose, onPicktureTaken }) {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const cameraRef = useRef();


    useEffect(() => {
        Camera.requestCameraPermissionsAsync()
    }, [])

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const __takePicture = () => {
        if (cameraRef) {
            cameraRef.current.takePictureAsync().then(response => {
                onPicktureTaken(response)
            }).catch((error) => {
                alert(error);
            });
        }
    }
    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1500}
                animationInTiming={1500}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>

                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.topButtonView}>
                        <TouchableOpacity onPress={toggleCameraType}>
                            <Ionicons name={'camera-reverse'} color={'white'} size={50} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name={'close-circle'} color={'white'} size={50} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottamCon}>
                        <TouchableOpacity onPress={__takePicture} style={styles.pickButtn}>
                            <Ionicons name={'camera'} color={'white'} size={50} />
                        </TouchableOpacity>

                    </View>

                </Camera>
            </Modal>
        </View>
    )
}

export { CustomCamera };

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    flipButton: {
        height: 100,
        width: 100,
        padding: 10
    },
    topButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pickButtn: {
        alignSelf: 'center',
        marginTop: '100%'
    },
    bottamCon: {
        height: '90%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'

    }
})