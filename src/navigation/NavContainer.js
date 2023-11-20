import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupPage } from '../screens/signup/signupPage';
import { SigninPage } from '../screens/signin/signinPage';
import { HomePage } from '../screens/home/homePage';
import { AdtPage } from '../screens/ADT/adtPage';
import { CustomerPage } from '../screens/Customer/customerPage';



const Stack = createNativeStackNavigator();

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name='SignupPage' component={SignupPage} />
                <Stack.Screen name='SigninPage' component={SigninPage} />
                <Stack.Screen name='HomePage' component={HomePage} />
                <Stack.Screen name='ADTPage' component={AdtPage} />
                <Stack.Screen name='CustomerPage' component={CustomerPage} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { NavContainer };