import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../pages/Home/index';
import Details from '../pages/Detail/index'

const Stack = createNativeStackNavigator()

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home">
                <Stack.Screen
                name='Home'
                component={Home}
                />
                <Stack.Screen
                name='Details'
                component={Details}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyStack;