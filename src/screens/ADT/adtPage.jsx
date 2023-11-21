import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image, Text, SafeAreaView } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';


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
    const [date, setDate] = useState('');

    const handleDateChange = newDate => {
        setDate(newDate);
    };

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
                <Header title={'ADT Marking'} />

                {/* Image Picker From Camera */}
                <View >
                    <TouchableOpacity onPress={onImagePressed}>
                        <View style={styles.imagePicker}>
                            <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
                            <Ionicons name={'camera-sharp'} size={50} color={'white'} style={{ marginBottom: 60, paddingBottom: 50, height: 100 }} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Add Username, Email, Password with Button*/}
                <View style={styles.formCon}>
                    <Input placeholder={'Sr. No'} onChange={setFirstName} />
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
                    <Input placeholder={"Installation Date"} showCalender={false} />

                    <Input placeholder={'Month'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'Installed By'} onChange={(text) => setPassword(text)} />


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

export { AdtPage }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.bgColors
    },
    formCon: {
        paddingTop: 30,
        paddingHorizontal: modifiers.containerPadding,
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
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
    },
    datePicker: {
        width: 200, // You can adjust the width as needed
    }, container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

})
