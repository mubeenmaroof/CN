import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { CusButton } from '../../customcomponents/custombutton';
import { Input } from "../../customcomponents/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../customcomponents/header";
import { MediaPicker } from '../../customcomponents/mediaPicker';
import { firebase } from '../../services/firebaseConfig';
import { CustomCamera } from '../../customcomponents/CustomCamera';
import { Loading } from '../../customcomponents/loading';
import { makeBlob } from '../../services/uploadImage';
import { getARandomImageName, showToast } from '../../utils/help';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';


function CustomerPage({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');
    const [showloading, setShowLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState();


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
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView >
                <Header title={'Customer Marking'} />
                {/* Image Picker From Camera */}
                <View style={styles.imagePicker}>
                    <TouchableOpacity onPress={onImagePressed}>
                        {(imageFromPicker || imageFromCamera) ? (
                            <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
                        ) : (
                            <Ionicons name={'camera-sharp'} size={50} color={'white'}
                                style={{ height: 150, marginLeft: 25, marginTop: 25 }} />
                        )}
                    </TouchableOpacity>
                </View>


                {/* Add Username, Email, Password with Button*/}
                <View style={styles.formCon}>
                    <Input placeholder={'Sr. No'} />
                    <Input placeholder={'POP_ID'} onChange={setlastName} />
                    <Input placeholder={'Pocket_ID'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'Block Name'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'ADT_ID'} onChange={setlastName} />
                    <Input placeholder={'ADT Adress'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'ADT SP No'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'SLOT'} onChange={setlastName} />
                    <Input placeholder={'PON'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'DC_ID'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'Fiber Length (m)'} onChange={setlastName} />
                    <Input placeholder={'SP Type'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'SP Port'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'Month'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'Installed By'} onChange={(text) => setDate(text)} />



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
        </SafeAreaView>
    );
}

export { CustomerPage }

const styles = StyleSheet.create({
    formCon: {
        paddingHorizontal: modifiers.containerPadding,
        marginTop: 20
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
        marginTop: 20
    }
})
