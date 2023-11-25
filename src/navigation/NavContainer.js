import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupPage } from '../screens/signup/signupPage';
import { SigninPage } from '../screens/signin/signinPage';
import { HomePage } from '../screens/home/homePage';
import { AdtPage } from '../screens/ADT/adtPage';
import { CustomerPage } from '../screens/Customer/customerPage';
import { AdtDetail } from '../screens/ADT/adtDetail';
import { CustomerDetail } from '../screens/Customer/customerDetail';
import { SplashScreen } from '../customcomponents/splashScreen';
import { ForgetPage } from '../screens/forgetscreen/forgetScreen';


const Stack = createNativeStackNavigator();

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Splash'} >
                <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SignupPage' component={SignupPage} />
                <Stack.Screen name='SigninPage' component={SigninPage} />
                <Stack.Screen name='ForgetPage' component={ForgetPage} />
                <Stack.Screen name='HomePage' component={HomePage} />
                <Stack.Screen name='ADTPage' component={AdtPage} />
                <Stack.Screen name='CustomerPage' component={CustomerPage} />
                <Stack.Screen name='CustomerDetail' component={CustomerDetail} />
                <Stack.Screen name='AdtDetail' component={AdtDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { NavContainer };