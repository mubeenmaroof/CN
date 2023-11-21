import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Header } from "../../customcomponents/header";



function CustomerDetail() {
    return (
        <ScrollView style={styles.mainContainer}>
            <Header title={'Customer Details'} />
        </ScrollView>
    );
}

export { CustomerDetail };

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});