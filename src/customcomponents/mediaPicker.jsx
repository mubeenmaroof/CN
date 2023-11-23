import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import { CusButton } from "./custombutton";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function MediaPicker({ show, onClose, onCameraPressed, onImagePickerSelected }) {
    const pickImageFrpmGallery = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        }).then(response => {
            if (response.canceled) {
                alert('Not Selected')
            } else {
                onImagePickerSelected(response.assets[0])
            }
        }).catch(error => {
            alert('pick select nai kia')
        })

    }
    return (
        <View>
            <Modal animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationOutTiming={1200}
                animationInTiming={1200}
                isVisible={show} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ height: '35%', backgroundColor: 'white', justifyContent: 'center', padding: 10, borderRadius: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={styles.circleView} onPress={onCameraPressed}>
                            <Ionicons name={'camera-sharp'} size={50} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleView} onPress={pickImageFrpmGallery}>
                            <Ionicons name={'image-sharp'} size={50} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.textCon}>Camera</Text>
                        <Text style={styles.textCon}>Gallary</Text>
                    </View>
                    <View>
                        <CusButton title={'Cancel'} onButtonPress={onClose} />
                    </View>

                </View>
            </Modal>
        </View>
    )
}

export { MediaPicker };

const styles = StyleSheet.create({
    circleView: {
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 35,
        alignItems: 'center',
        columnGap: 15,
    }, textCon: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        letterSpacing: 1,
    }
})