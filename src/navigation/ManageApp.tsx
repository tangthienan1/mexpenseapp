import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
import { useSharedState } from '../contexts';
import Tabs from './tabs';
import { AddExpense, AddNote } from '../screens';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser, tripsByUserID } from '../graphql/queries';

const Stack = createNativeStackNavigator();

type ManageAppProps = {
    user: any;
};

const ManageApp: FC<ManageAppProps> = ({ user }) => {
    const { updateSharedState } = useSharedState();

    useEffect(() => {
        const getUserDataOnDB = async () => {
            const resp: any = await API.graphql(
                graphqlOperation(getUser, { id: user.attributes.sub })
            );
            const userData = resp.data.getUser;
            updateSharedState({ userData });
        };

        getUserDataOnDB();
    }, [user]);

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
