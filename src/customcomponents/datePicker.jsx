import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Input } from './input';


function DateTimePicker({ onDateChange }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [textInputValue, setTextInputValue] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        setTextInputValue(date.toDateString()); // Format the date as needed
        onDateChange(date); // Pass the selected date to the parent component if needed
        hideDatePicker();
    };

    return (

        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Input
                    style={{ borderWidth: 1 }}
                    placeholder="Select Date"
                    editable={true}
                    value={textInputValue}
                    showIcon={true}
                    iconName={'calendar-sharp'}
                    onIconPress={showDatePicker}
                />

            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={'date'}
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
        </View>

    );
};


export { DateTimePicker };
