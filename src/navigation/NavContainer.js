import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './DarwerNav';
import { MyTab } from './TabNav';
import { SplashScreen } from '../customcomponents/splashScreen';

const Stack = createStackNavigator();

function NavContainer() {

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="Splash">
                <Stack.screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="NavContainer">
                    {() => (
                        <MyDrawer>
                            <MyTab />
                        </MyDrawer>
                    )}
                </Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export { NavContainer };


