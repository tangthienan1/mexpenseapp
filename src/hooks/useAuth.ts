import { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

export const useAuth = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
                setUser(authUser);
            } catch (error) {
                setUser(null);
            }
        };

        //Add event to listen when user signIn || signOut
        const amplifyChanelListener = (data: any) => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        };

        const hubListenerCancelToken = Hub.listen('auth', amplifyChanelListener);

        return () => {
            hubListenerCancelToken();
        };
    }, []);

    //Add User to DB if not exist
    useEffect(() => {
        if (user) {
            const addUserToDB = async () => {
                const userData: any = await API.graphql(
                    graphqlOperation(getUser, { id: user.attributes.sub })
                );

                if (userData.data.getUser) {
                    console.log('User already exists in DB');
                } else {
                    const newUser = {
                        id: user.attributes.sub,
                        name: user.attributes.name,
                        email: user.attributes.email,
                    };
                    const userAdded = await API.graphql(
                        graphqlOperation(createUser, { input: newUser })
                    );
                    console.log('Added user to DB', userAdded);
                }
            };
            addUserToDB();
        }
    }, [user]);

    return {
        user,
    };
};
