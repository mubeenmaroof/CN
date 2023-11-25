import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
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
import { GenderSelector } from '../../customcomponents/genderSelector';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';





function SignupPage({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [isCameraShown, setIsCameraShown] = useState(false);
    const [imageFromPicker, setImageFromPicker] = useState('');
    const [imageFromCamera, setImageFromCamera] = useState('');
    const [showloading, setShowLoading] = useState(false);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
    }

    // Firebase Auth 
    const signUp = () => {
        console.log(firstName, lastName, email, password, gender);
        //create a user account in firebase auth then upload Image
        setShowLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user.uid;
                console.log('Signed up user:', user.uid);
                uploadImage(imageFromCamera || imageFromPicker);
                showToast("success", "Registered Successfully Proceed to Login", "top");
                navigation.navigate('SigninPage')

                // Add Username, Email, Password in Firestore
                setShowLoading(true)
                firebase.firestore().collection("users/").doc(email).set({
                    name: firstName, lastName,
                    email: email,
                    password: password,

                }).then(() => {
                    alert("Sign Up Succeccfull")
                    navigation.navigate('SigninPage')
                }).catch((err) => {
                    Alert.alert(err)
                })
            })
            .catch((autherror) => {
                // Error occurred
                console.log(autherror);
                setShowLoading(false);
                showToast("error", autherror.message, "top");
            });

    };
    // Navigate to Sign in Page
    const goToSiginp = () => {
        navigation.navigate('SigninPage')
    };
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColors }}>
            <ScrollView >
                <Header title={'Sign up'} onPress={goToSiginp} />

                {/* Image Picker From Camera */}
                <View>
                    <TouchableOpacity onPress={onImagePressed}>
                        <View style={styles.imagePicker}>
                            <Image source={{ uri: imageFromPicker || imageFromCamera }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode={'contain'} />
                            <Ionicons name={'camera-sharp'} size={50} color={'white'} style={{ marginBottom: 60, paddingBottom: 50, height: 100 }} />
                        </View>
                    </TouchableOpacity>
                </View>


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
                    <Input placeholder={'Mobile No'} showIcon={true} iconName={'person-outline'} onChange={(text) => setMobileNo(text)} />

                    <GenderSelector selectedGender={selectedGender}
                        onGenderChange={handleGenderChange}
                    />


                    <View style={styles.textBtnCon}>
                        <TextButton title={'Already have an account?'} onPress={goToSiginp} />
                    </View>
                    <CusButton title='Sign up' onButtonPress={signUp} />
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

export { SignupPage }

const styles = StyleSheet.create({
    formCon: {
        paddingTop: 80,
        height: '60%',
        justifyContent: 'center',
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
        alignItems: 'center',
        justifyContent: 'center'

    }
})
