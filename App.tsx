import React, { useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { SharedStateProvider } from './src/contexts';
import { useAuth } from './src/hooks';
import { AuthApp, ManageApp } from './src/navigation';
import { theme } from './src/consts';
import { User } from './src/API';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';

const App = () => {
    const [userData, setUserData] = useState<User | undefined>();
    const { user } = useAuth();

    useEffect(() => {
        const getUserDataOnDB = async () => {
            const resp: any = await API.graphql(
                graphqlOperation(getUser, { id: user.attributes.sub })
            );
            const userDataFromResponse = resp.data.getUser;
            setUserData(userDataFromResponse);
        };
        getUserDataOnDB();
    }, [user]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return userData ? (
        <SharedStateProvider initialState={{ userData: userData }}>
            <ManageApp />
        </SharedStateProvider>
    ) : (
        <AuthApp />
    );
};

const defaultAppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.MCOLORS.primary,
        secondary: theme.MCOLORS.secondary,
    },
};

export default () => (
    <PaperProvider theme={defaultAppTheme}>
        <App />
    </PaperProvider>
);
