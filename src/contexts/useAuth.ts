import { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

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

    const addUserToDB = async () => {
        const userData: any = await API.graphql(
            graphqlOperation(getUser, { id: user.attributes.sub })
        );

        if (userData.data.getUser) {
            console.log('User already exists in DB');
            return;
        }

        const newUser = {
            id: user.attributes.sub,
            name: user.attributes.name,
            email: user.attributes.email,
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
    };

    useEffect(() => {
        const amplifyChanelListener = (data: any) => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        };
        Hub.listen('auth', amplifyChanelListener);
        addUserToDB();
        return () => {
            Hub.remove('auth', amplifyChanelListener);
        };
    }, []);

    return {
        user,
    };
};
