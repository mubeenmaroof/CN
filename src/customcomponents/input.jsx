import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors, modifiers } from "../utils/theme";

function Input({ onChange, placeholder, isSecure, showIcon, iconName, onIconPress, beMultiline, editable, value, capital }) {
    return (
        <View style={styles.inputCon}>
            <TextInput style={styles.input}
                placeholder={placeholder}
                onChangeText={onChange}
                secureTextEntry={isSecure}
                multilin={beMultiline}
                editable={editable}
                value={value}
                autoCapitalize={capital}

            />
            {
                showIcon === true ?
                    <Ionicons style={styles.icon} name={iconName} size={30} color={colors.green} onPress={onIconPress} /> :
                    <View />
            }

        </View>

    )
}

export { Input }

const styles = StyleSheet.create({
    inputCon: {
        paddingHorizontal: 20,
        height: 70,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginHorizontal: 10,
        borderRadius: 5,
        marginVertical: modifiers.itemMargin,
        flexDirection: 'row',
        flex: 1


    },
    input: {
        width: '95%',

    },
    icon: {
        alignSelf: 'center'
    },
    iconCalen: {
        alignSelf: 'center'
    }
})