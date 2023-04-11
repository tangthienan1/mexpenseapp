import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<any>();

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setUser(authUser);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        const amplifyChanelListener = (data: any) => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        };
        Hub.listen('auth', amplifyChanelListener);
        return () => {
            Hub.remove('auth', amplifyChanelListener);
        };
    }, []);

    return {
        user,
    };
};
