import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image, Text } from 'react-native';
import { CusButton } from '../../customcomponents/custombutton';
import { Input } from "../../customcomponents/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../customcomponents/header";
import { TextButton } from "../../customcomponents/textButton";
import { MediaPicker } from '../../customcomponents/mediaPicker';
import { firebase } from '../../services/firebaseConfig';
import { CustomCamera } from '../../customcomponents/CustomCamera';
import { Loading } from '../../customcomponents/loading';
import { makeBlob } from '../../services/uploadImage';
import { getARandomImageName, showToast } from '../../utils/help';
import Toast from 'react-native-toast-message';



function AdtPage({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState();
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');
    const [showloading, setShowLoading] = useState(false);


    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
    }


    // Open Media Picker
    const onImagePressed = () => {
        setIsPickerShown(!isPickerShown)
    };

    async function uploadImage(imgUri) {
        try {
            const imgBlob = await makeBlob(imgUri);
            const userStorageRef = firebase.storage().ref("users/");
            const imageName = getARandomImageName();
            console.log(imageName);
            await userStorageRef
                .child(imageName)
                .put(imgBlob)
                .then((uploadResponse) => {
                    console.log(uploadResponse)
                    setShowLoading(false);

                    Toast.show({
                        type: 'success',
                        text1: 'Hello',
                        text2: 'This is some something 👋',
                        position: 'bottom',
                    });


                })
                .catch((uploadError) => {
                    console.log(uploadError)
                    setShowLoading(false);
                })

        } catch (blobError) {
            console.log(blobError)
            setShowLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColors }}>
            <Header title={'ADT Marking'} />

            {/* Image Picker From Camera */}
            <TouchableOpacity onPress={onImagePressed}>
                <View style={styles.imagePicker}>
                    <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
                </View>
            </TouchableOpacity>


            {/* Add Username, Email, Password with Button*/}
            <View style={styles.formCon}>
                <Input placeholder={'First Name'} showIcon={true} iconName={'person-outline'} onChange={setFirstName} />
                <Input placeholder={'Last Name'} showIcon={true} iconName={'person-outline'} onChange={setlastName} />
                <Input placeholder={'Email'} showIcon={true} iconName={'mail-outline'} onChange={(text) => setEmail(text)} />
                <Input placeholder={'Password'}
                    isSecure={!showPass}
                    showIcon={true}
                    iconName={showPass === false ? 'eye-outline' : 'eye-off-outline'}
                    onIconPress={handleShowPass}
                    onChange={(text) => setPassword(text)}
                />


                <CusButton title='Submit' />
            </View>

            {/* Media Picker From Camera or Gallery*/}
            <MediaPicker show={isPickerShown}
                onClose={onImagePressed}
                onImagePickerSelected={(imageSelected) => { onImageCameFromGallery(imageSelected) }}
                onCameraPressed={() => { setIsCameraShown(!isCameraShown) }}
            />
            <CustomCamera show={isCameraShown}
                onClose={() => setIsCameraShown(false)}
                onPicktureTaken={(response) => {
                    setIsCameraShown(false), setIsPickerShown(false)
                    setImageFromCamera(response.uri)
                }}
            />
            {showloading && <Loading />}
            <Toast />

        </ScrollView>
    );
}

export { AdtPage }

const styles = StyleSheet.create({
    formCon: {
        height: 500,
        justifyContent: 'center',
        paddingHorizontal: modifiers.containerPadding
    },
    textBtnCon: {
        alignItems: 'flex-end'
    },
    imagePicker: {
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})
