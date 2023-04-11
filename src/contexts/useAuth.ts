import { useEffect, useState } from 'react';

export const useAuth = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>();

    // useEffect(() => {
    //     const onAuthStateChanged = (authUser) => {
    //         setUser(authUser);
    //         if (initializing) {
    //             setInitializing(false);
    //         }
    //     };
    //     const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(onAuthStateChanged);
    //     return unsubscribeFromAuthStateChanged;
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return {
        user: {
            
        },
        initializing: false,
    };
};
