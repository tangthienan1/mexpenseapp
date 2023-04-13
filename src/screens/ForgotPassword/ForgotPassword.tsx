import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ErrorText from '../../components/Text';
import { LOGIN_SCREEN, MCOLORS, MFONTS, MSIZES, NEWPASSWORD_SCREEN, icons } from '../../consts';

type ForgotPasswordProps = {
    navigation: any;
};

const ForgotPassword: FC<ForgotPasswordProps> = ({ navigation }) => {
    const [error, setError] = useState<string | undefined>();

    const [email, setEmail] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onConfirm = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        if (email) {
            try {
                await Auth.forgotPassword(email);
                navigation.navigate(NEWPASSWORD_SCREEN, { email });
            } catch (e) {
                console.log({ e });
                setError((e as any).message);
            }
        } else {
            setError('You need to complete the form!!');
        }
        setIsLoading(false);
    };

    return (
        <KeyboardAvoidingView style={loginStyle.login}>
            <LinearGradient colors={[MCOLORS.lime, MCOLORS.emerald]} style={loginStyle.login}>
                <ScrollView>
                    <View style={loginStyle.logo}>
                        <Image source={icons.logo} />
                    </View>

                    <View style={loginStyle.title}>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.h1 }}>
                            Reset your password
                        </Text>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.body3 }}>
                            Please enter your email
                        </Text>
                    </View>

                    <View style={loginStyle.form}>
                        <Text style={loginStyle.inputTile}>Email</Text>
                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setEmail(text as any)}
                        />
                        {error && <ErrorText message={error} />}

                        <View style={loginStyle.buttonWrapper}>
                            <TouchableOpacity style={loginStyle.loginButton} onPress={onConfirm}>
                                {!isLoading ? (
                                    <Text style={{ color: MCOLORS.white, ...MFONTS.h3 }}>
                                        Confirm
                                    </Text>
                                ) : (
                                    <ActivityIndicator color={MCOLORS.emerald} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={loginStyle.bottomText}
                            onPress={() => navigation.navigate(LOGIN_SCREEN)}
                        >
                            <Text style={loginStyle.inputTile}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};
export const loginStyle = StyleSheet.create({
    bottomText: {
        alignItems: 'center',
        marginBottom: MSIZES.padding2 * 9,
    },
    newUserText: {
        color: MCOLORS.lightGreen,
    },
    forgotPasswordWrapper: {
        marginTop: MSIZES.padding * 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        textAlign: 'right',

        ...MFONTS.h3,
    },
    buttonWrapper: {
        marginTop: MSIZES.padding * 2,
    },
    loginButton: {
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MCOLORS.black,
    },
    textInput: {
        marginVertical: 12,
        padding: 10,
        height: 40,

        borderWidth: 1,
        borderColor: MCOLORS.lightGreen,
        borderRadius: 10,
    },
    inputTile: {
        marginTop: MSIZES.padding,
        color: MCOLORS.lightGreen,
        ...MFONTS.body3,
    },
    form: {
        marginTop: MSIZES.padding * 2,
        marginHorizontal: MSIZES.padding2 * 2,
    },
    title: {
        marginTop: MSIZES.padding * 2,
        color: MCOLORS.white,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        marginTop: MSIZES.body1 * 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        flex: 1,
    },
    google: {
        height: 48,
        width: 192,
    },
});
export default ForgotPassword;
