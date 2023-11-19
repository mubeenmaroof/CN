
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { View } from 'react-native';


function GenderSelector() {

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

    const [selectedId, setSelectedId] = useState();


    return (


        <View style={{ alignItems: 'flex-start' }}>

            <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout={'row'}

            />

        </View>




    )

}


export { GenderSelector };


