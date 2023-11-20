import { StyleSheet, View } from "react-native";
import { CusButton } from "../../customcomponents/custombutton";
import { Header } from "../../customcomponents/header";
import { colors } from "../../utils/theme";


function HomePage({ navigation }) {

    const gotoAdtPage = () => {
        navigation.navigate('ADTPage')
    }

    const gotoCustomerPage = () => {
        navigation.navigate('CustomerPage')
    }
    const gotoAdtDetail = () => {
        navigation.navigate('ADTDetail')
    }

    const gotoCustomerDetail = () => {
        navigation.navigate('CustomerDetail')
    }

    return (
        <View style={styles.maincontainer}>

            <Header title={'Home Page'} />
            <View style={styles.container}>
                <CusButton title="Mark ADT" onButtonPress={gotoAdtPage} />
                <CusButton title="Mark Customer" onButtonPress={gotoCustomerPage} />
                <CusButton title="ADT Detail" onButtonPress={gotoAdtDetail} />
                <CusButton title="Customer Detail" onButtonPress={gotoCustomerDetail} />
            </View>

        </View>
    );
}

export { HomePage };

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: colors.bgColors
    },
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '60%',
        marginTop: 150,
    },

})