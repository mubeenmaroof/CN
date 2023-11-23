import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header } from "../../customcomponents/header";
import { colors } from "../../utils/theme";


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
        <View style={{ flex: 1 }}>
            <Header title={'Home Page'} />
            <View style={styles.container}>

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
        </View>
    );
};

export { HomePage };

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    item: {
        backgroundColor: colors.primary,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: 150,
        height: 150,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'

    }, texthead: {
        fontSize: 25,
        marginBottom: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});