import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header } from "../../customcomponents/header";


function HomePage({ navigation }) {

    const gotoAdtPage = () => {
        navigation.navigate('ADTPage')
    };

    const gotoCustomerPage = () => {
        navigation.navigate('CustomerPage')
    };
    const gotoAdtDetail = () => {
        navigation.navigate('AdtDetail')
    };

    const gotoCustomerDetail = () => {
        navigation.navigate('CustomerDetail')
    };

    return (
        <View style={styles.container}>
            <Header title={'Home Page'} />
            <Text style={styles.texthead}> Marking Section </Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.item} onPress={gotoAdtPage}>
                    <Text style={styles.text}>ADT Mark</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={gotoCustomerPage}>
                    <Text style={styles.text}>Customer Mark</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.texthead}>Detail Section</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.item} onPress={gotoAdtDetail}>
                    <Text style={styles.text}>ADT Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={gotoCustomerDetail}>
                    <Text style={styles.text}>Customer Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { HomePage };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    item: {
        backgroundColor: 'blue',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: 130,
        height: 130,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',

    }, texthead: {
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',

    }
});