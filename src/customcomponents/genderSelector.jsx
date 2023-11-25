
import React, { useMemo } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { View, Text, StyleSheet } from 'react-native';


function GenderSelector({ selectedGender, onGenderChange }) {

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Female',
            value: 'option2'
        }
    ]), []);


    return (
        <View style={style.container}>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>Select Gender :</Text>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={onGenderChange}
                selectedId={selectedGender}
                layout={'row'}
                value={selectedGender}
            />
        </View>
    );
};


export { GenderSelector };

const style = StyleSheet.create({
    container: {
        marginLeft: 15
    }
})


