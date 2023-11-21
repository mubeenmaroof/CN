import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';


function Calender() {
    const [selected, setSelected] = useState('');

    return (
        <Calendar
            style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350
            }}
            // Specify the current date
            current={'2012-03-01'}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
                console.log('selected day', day);
            }}
            // Mark specific dates as marked
            markedDates={{
                '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
                '2012-03-02': { marked: true },
                '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' }
            }}

        />
    );
};
export { Calender };