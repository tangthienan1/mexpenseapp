import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, MCOLORS, MFONTS, MSIZES } from '../../consts';
import AccountOption from '../../components/AccountOptions';

const Account = () => {
    // const { user } = useAuth();

    const user ={
        email: 'testemail@gmail.com'
    }

    const [isSignOut, setIsSignOut] = useState(false);

    const onSignOut = () => {
        // setIsSignOut(true);
        // auth()
        //     .signOut()
        //     .then(() => setIsSignOut(false));
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: MCOLORS.white,
                paddingHorizontal: MSIZES.padding,
            }}
        >
            <View style={{ alignItems: 'center', marginBottom: MSIZES.padding2 * 3 }}>
                <Image style={{ height: 36, width: 36 }} source={icons.logo} />
            </View>

            <View style={{ alignItems: 'center', marginBottom: MSIZES.padding }}>
                <View
                    style={{
                        height: 120,
                        width: 120,
                        backgroundColor: MCOLORS.gray,
                        borderRadius: 100,
                    }}
                >
                    <Image style={{ width: 120, height: 120 }} source={icons.emptyAvatar} />
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0 }}>
                        <View
                            style={{
                                width: 38,
                                height: 38,
                                backgroundColor: MCOLORS.blue,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={icons.camera} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: 'center', marginBottom: MSIZES.padding2 * 5 }}>
                <Text style={{ ...MFONTS.body2 }}>Ho Nguyen Phu Bao</Text>
                <Text style={{ ...MFONTS.body2, color: MCOLORS.gray }}>(+84) 963 893 893</Text>
                <Text style={{ ...MFONTS.body2, color: MCOLORS.gray }}>{user?.email}</Text>
            </View>

            <AccountOption title={'Edit Profile'} />
            <AccountOption title={'Export Data'} />
            <AccountOption title={'Settings'} />
            <AccountOption title={'Support Info'} />
            <AccountOption
                title={'Sign out'}
                onPress={onSignOut}
                icon={isSignOut && <ActivityIndicator />}
            />
        </SafeAreaView>
    );
};

export default Account;
