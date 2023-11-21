import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Header } from "../../customcomponents/header";



function AdtDetail() {
    return (
        <ScrollView style={styles.mainContainer}>
            <Header title={'ADT Details'} />
        </ScrollView>
    );
}

export { AdtDetail };

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});