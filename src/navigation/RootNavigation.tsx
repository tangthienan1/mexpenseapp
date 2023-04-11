import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SharedStateProvider } from '../contexts';
import AuthApp from './AuthApp';
import ManageApp from './ManageApp';
import { useAuth } from '../contexts/useAuth';

export default function RootNavigation() {
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
}
