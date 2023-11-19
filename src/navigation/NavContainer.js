import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup } from '../screens/signup/signup';
import { Signin } from '../screens/signin/signin';


const Stack = createNativeStackNavigator();

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Sign Up' component={Signup} />
                <Stack.Screen name='Sign In' component={Signin} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { NavContainer };