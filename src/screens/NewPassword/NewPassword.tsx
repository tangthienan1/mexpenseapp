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
import { LOGIN_SCREEN, MCOLORS, MFONTS, MSIZES, icons } from '../../consts';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

type RouteParamProps = {
    email: string;
};

type NewPasswordRouteProp = RouteProp<ParamListBase> & {
    params: RouteParamProps;
};
type NewPasswordProps = {
    navigation: any;
};

type ErrorType = {
    newPassword?: string;
    screen?: string;
};

const NewPassword: FC<NewPasswordProps> = ({ navigation }) => {
    const route = useRoute<NewPasswordRouteProp>();
    const email = route?.params?.email;
    const [error, setError] = useState<ErrorType>();

    const [changeEmailCode, setChangeEmailCode] = useState<string | undefined>();
    const [newPassword, setNewPassword] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validatePassword = (inputPassword: string) => {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(inputPassword)) {
            setError({ ...error, ...{ newPassword: 'Invalid password' } });
            return;
        }
        setError({ ...error, ...{ newPassword: undefined } });
    };

    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        if (email && newPassword && changeEmailCode && !error?.newPassword && !error?.screen) {
            try {
                const response = await Auth.forgotPasswordSubmit(
                    email,
                    changeEmailCode,
                    newPassword
                );
                console.log({ response });
                navigation.navigate(LOGIN_SCREEN);
            } catch (e) {
                console.log({ e });
                setError((e as any).message);
            }
        } else {
            setError({ ...error, ...{ screen: 'You need to complete the form!!' } });
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
                            Please enter form to complete reset password
                        </Text>
                    </View>

                    <View style={loginStyle.form}>
                        <Text style={loginStyle.inputTile}>Email</Text>
                        <TextInput editable={false} value={email} style={loginStyle.textInput} />

                        <Text style={loginStyle.inputTile}>Code</Text>
                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setChangeEmailCode(text as any)}
                        />

                        <Text style={loginStyle.inputTile}>New Password</Text>

                        <TextInput
                            secureTextEntry={true}
                            style={loginStyle.textInput}
                            onChangeText={(text) => setNewPassword(text)}
                            onBlur={(e) => validatePassword(e.nativeEvent.text)}
                        />
                        {error?.newPassword && <ErrorText message={error.newPassword} />}
                        {error?.screen && <ErrorText message={error.screen} />}

                        <View style={loginStyle.buttonWrapper}>
                            <TouchableOpacity style={loginStyle.loginButton} onPress={handleSubmit}>
                                {!isLoading ? (
                                    <Text style={{ color: MCOLORS.white, ...MFONTS.h3 }}>
                                        Submit
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
export default NewPassword;
