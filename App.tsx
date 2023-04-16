import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { SharedStateProvider } from './src/contexts';
import { useAuth } from './src/hooks';
import { AuthApp, ManageApp } from './src/navigation';
import { theme } from './src/consts';

const App = () => {
    const { user } = useAuth();

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return user ? (
        <SharedStateProvider>
            <ManageApp user={user} />
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
