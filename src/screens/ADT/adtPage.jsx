import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image, Text, SafeAreaView } from 'react-native';
import { CusButton } from '../../customcomponents/custombutton';
import { Input } from "../../customcomponents/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../customcomponents/header";
import { MediaPicker } from '../../customcomponents/mediaPicker';
import { firebase } from '../../services/firebaseConfig';
import { CustomCamera } from '../../customcomponents/CustomCamera';
import { Loading } from '../../customcomponents/loading';
import { makeBlob } from '../../services/uploadImage';
import { getARandomImageName } from '../../utils/help';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { DateTimePicker } from '../../customcomponents/datePicker';


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
    const [srNo, setSrNo] = useState(1); // Initial Sr. No
    const [otherField, setOtherField] = useState('');


    // For Drop Down Picker Select
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory1, setSelectedSubcategory1] = useState(null);
    const [selectedSubcategory2, setSelectedSubcategory2] = useState(null);
    // Add Splitter Detail
    const [selectedSplitter, setSelectedSplitter] = useState(null);
    // Add Date
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        // Handle the selected date as needed in the parent component
        setSelectedDate(!selectedDate)
    };
    const categories = [
        { label: 'Select a POP', value: null },
        { label: 'Model Town POP', value: 'MTPOP' },
        { label: 'Satellite Town POP', value: 'STPOP' },
        { label: 'Tariq POP', value: 'TQPOP' },
        // Add more categories as needed
    ];
    const subcategoryOptions = {
        MTPOP: [
            // Subcategories for Model Town POP
            { label: 'Select a Pocket', value: null },
            { label: 'Model Town A', value: 'MT01' },
            { label: 'Model Town B', value: 'MT02' },
            { label: 'Muhammadia & Trust Colony', value: 'MT03' },
            { label: 'Al-Noor & Hashmi Garden', value: 'MT04' },
            { label: 'Model Town C', value: 'MT05' },
            { label: 'Sadiq + Officer + Adil Town', value: 'MT06' },
            { label: 'Faisal Bagh', value: 'MT07' },
            { label: 'Cheema Town', value: 'MT08' },
            { label: 'Qasim Towm', value: 'MT09' },
            { label: 'Model Town B1', value: 'MT10' },
            { label: 'Kausar Colony', value: 'MT11' },
            { label: 'Islami Colony ', value: 'MT12' },
        ],
        STPOP: [
            // Subcategories for Satellite Town POP
            { label: 'Select a Pocket', value: null },
            { label: 'Satellite Town', value: 'ST01' },
            { label: 'Muslim Town', value: 'ST02' },
            { label: 'New Satellite Town', value: 'ST03' },
            { label: 'Govt. Employee Society Pk1', value: 'ST04-PK1' },
            { label: 'Govt. Employee Society Pk2', value: 'ST05-PK2' },
            { label: 'City Garden', value: 'ST06' },
        ],
        TQPOP: [
            // Subcategories for Tariq POP
            { label: 'Select a Pocket', value: null },
            { label: 'Khayaban-e-Ali', value: 'TQ01' },
            { label: 'DHA Bahawalpur', value: 'TQ02' },
        ],

    };
    const subcategoryOptions1 = {
        MT01: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        MT02: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        MT03: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        ST01: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        ST02: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        ST03: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        TQ01: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },

        ],
        TQ02: [
            // Subcategories for Model Town POP
            { label: 'Select a DC Cable', value: null },
            { label: 'DC01', value: 'DC01' },
            { label: 'DC02', value: 'DC02' },
            { label: 'DC03', value: 'DC03' },
            { label: 'DC04', value: 'DC04' },
            { label: 'DC05', value: 'DC05' },
        ]

    };

    const splitterType = [
        { label: 'Select a Splitter', value: null },
        { label: '1/4', value: '1/4' },
        { label: '1/8', value: '1/8' },
        { label: '1/16', value: '1/16' },
        // Add more categories as needed
    ];

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedSubcategory1(null);
        setSelectedSubcategory2(null);
    };



    const handleSubmit = () => {
        // Handle form submission logic here
        // Increment Sr. No for the next entry
        setSrNo((prevSrNo) => prevSrNo + 1);
        // Update the TextInput value with the new Sr. No
        setOtherField(`Sr. No: ${srNo + 1}`);
    };
    const handleShowPass = () => {
        setShowPass(!showPass)
    };
    const onImageCameFromGallery = (image) => {
        setImageFromPicker(image.uri)
        setIsPickerShown(false)
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
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView >
                <Header title={'ADT Marking'} />

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
                    <View style={styles.sp}>
                        <Text>Add ADT Details:</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={categories.filter(item => item.value !== null)}
                            onValueChange={handleCategoryChange}
                            value={selectedCategory}
                        />

                        {selectedCategory && (
                            <>
                                <Text>Select Pockets for {selectedCategory}:</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={subcategoryOptions[selectedCategory].filter(item => item.value !== null)}
                                    onValueChange={(value) => setSelectedSubcategory1(value)}
                                    value={selectedSubcategory1}
                                />
                            </>
                        )}

                        {selectedSubcategory1 && (
                            <>
                                <Text>Select a Distribution Cable for {selectedSubcategory1}:</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={subcategoryOptions1[selectedSubcategory1].filter(item => item.value !== null)}
                                    onValueChange={(value) => setSelectedSubcategory2(value)}
                                    value={selectedSubcategory2}
                                />
                            </>
                        )}
                    </View>


                    <Input placeholder={'Block Name'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'ADT_ID'} onChange={setlastName} />
                    <Input placeholder={'ADT Adress'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'ADT SP No'} onChange={(text) => setPassword(text)} />
                    <Input placeholder={'SLOT'} onChange={setlastName} />
                    <Input placeholder={'PON'} onChange={(text) => setEmail(text)} />
                    <Input placeholder={'Fiber Length (m)'} onChange={setlastName} />
                    <View style={styles.sp}>
                        <Text>Add Splitter Details:</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={splitterType.filter(item => item.value !== null)}
                            onValueChange={(value) => setSelectedSplitter(value)}
                            value={selectedSplitter}
                            style={styles.drop}
                        />
                    </View>

                    <Input placeholder={'SP Port'} onChange={(text) => setPassword(text)} />
                    <DateTimePicker onDateChange={handleDateChange} onChange={(date) => setSelectedDate(date)} />


                    <CusButton title='Submit' onButtonPress={handleSubmit} />
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

export { AdtPage };

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
    }, sp: {
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 20,
        marginVertical: modifiers.itemMargin,
    }, infoContainer: {
        flexDirection: 'row',
        left: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around'


    },

});

