import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SharedStateProvider } from './src/contexts';
import { useAuth } from './src/contexts/useAuth';
import { AuthApp, ManageApp } from './src/navigation';

const App = () => {
    const { user } = useAuth();
    console.log({ user });


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

export default App;
