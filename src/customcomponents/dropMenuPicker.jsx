import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

function DropdownPicker() {
    return (
        <View style={styles.container}>
            <RNPickerSelect
            />
        </View>
    );
};

export { DropdownPicker };

const styles = StyleSheet.create({
    container: {

    }
})
