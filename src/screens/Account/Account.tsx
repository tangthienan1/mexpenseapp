import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountOption from '../../components/AccountOptions';
import { MCOLORS, MFONTS, MSIZES, icons } from '../../consts';
import { useSharedState } from '../../contexts';

const Account = () => {
    const { userData } = useSharedState();
    console.log({ userData });
    const userEmail = userData.email
    const userName = userData.name

    const [isSignOut, setIsSignOut] = useState(false);

    const onSignOut = async () => {
        if (isSignOut) {
            return;
        }
        setIsSignOut(true);
        try {
            await Auth.signOut();
        } catch (error) {
            Alert.alert((error as any).message);
        }
        setIsSignOut(false);
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
                <Text style={{ ...MFONTS.body2 }}>{userName}</Text>
                {/* <Text style={{ ...MFONTS.body2, color: MCOLORS.gray }}>(+84) 963 893 893</Text> */}
                <Text style={{ ...MFONTS.body2, color: MCOLORS.gray }}>{userEmail}</Text>
            </View>

            <AccountOption title={'Edit Profile'} />
            <AccountOption title={'Export Data'} />
            <AccountOption title={'Settings'} />
            <AccountOption title={'Support Info'} />
            <AccountOption
                title="Sign out"
                onPress={onSignOut}
                icon={isSignOut && <ActivityIndicator />}
            />
        </SafeAreaView>
    );
};

export default Account;
