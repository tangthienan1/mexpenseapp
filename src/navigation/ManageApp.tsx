import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSharedState } from '../contexts';
import { AddExpense, AddNote } from '../screens';
import Tabs from './tabs';

const Stack = createNativeStackNavigator();

const ManageApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Tabs"
            >
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="AddExpense" component={AddExpense} />
                <Stack.Screen name="AddNote" component={AddNote} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ManageApp;
