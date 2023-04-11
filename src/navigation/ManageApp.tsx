import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
import { useSharedState } from '../contexts';
import AddExpense from '../screens/AddExpense';
import Tabs from './tabs';

const Stack = createNativeStackNavigator();

type ManageAppProps = {
    user: any;
};

const ManageApp: FC<ManageAppProps> = ({ user }) => {
    const { updateSharedState } = useSharedState();
    useEffect(() => {
        updateSharedState({ user });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Tabs"
            >
                {/* Tabs */}
                <Stack.Screen name="Tabs" component={Tabs} />

                <Stack.Screen name="AddExpense" component={AddExpense} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ManageApp;
