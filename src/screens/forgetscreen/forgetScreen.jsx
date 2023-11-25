import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { CusButton } from "../../customcomponents/custombutton";
import { Input } from "../../customcomponents/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../customcomponents/header";
import { TextButton } from "../../customcomponents/textButton";
import { Loading } from "../../customcomponents/loading";
import Toast from "react-native-toast-message";

function ForgetPage({ navigation }) {
    const [showloading, setShowLoading] = useState(false);
    const [email, setEmail] = useState("");


    const goToSignin = () => {
        navigation.navigate("SigninPage");
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bgColors }}>
            <Header title={"Forget Password"} />
            <View style={styles.formCon}>
                <Input
                    placeholder={"Email"}
                    showIcon={true}
                    iconName={"mail-outline"}
                    onChange={(text) => setEmail(text)}
                />

                <View style={styles.textBtnCon}>
                    <TextButton title={"Already have an Account?"} onPress={goToSignin} />
                </View>

                <CusButton title="Forget Password" />
            </View>
            {showloading === true && <Loading />}
            <Toast />
        </ScrollView>
    );
}

export { ForgetPage };

const styles = StyleSheet.create({
    formCon: {

        justifyContent: "center",
        paddingHorizontal: modifiers.containerPadding,
        marginTop: 150

    },

    goToSignup: {
        alignItems: "center",
    },
    textBtnCon: {
        alignItems: "flex-end",
    },
    textBtCon: {
        alignItems: "center",
    },
});
