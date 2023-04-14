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
import { FORGOTPASSWORD_SCREEN, MCOLORS, MFONTS, MSIZES, SIGNUP_SCREEN, icons } from '../../consts';

type LoginProps = {
    navigation: any;
};

const Login: FC<LoginProps> = ({navigation}) => {
    const [error, setError] = useState<string | undefined>();

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [isLoginProgress, setIsLoginProgress] = useState<boolean>(false);

    const handleLogin = async () => {
        if (isLoginProgress) {
            return;
        }

        setIsLoginProgress(true);

        if (email && password) {
            try {
                await Auth.signIn(email, password);
            } catch (e) {
                setError((e as any).message);
            }
        } else {
            setError('You need to complete the form!!');
        }
        setIsLoginProgress(false);
    };

    return (
        <KeyboardAvoidingView style={loginStyle.login}>
            <LinearGradient colors={[MCOLORS.lime, MCOLORS.emerald]} style={loginStyle.login}>
                <ScrollView>
                    <View style={loginStyle.logo}>
                        <Image source={icons.logo} />
                    </View>

                    <View style={loginStyle.title}>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.h1 }}>Login</Text>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.body3 }}>
                            Please enter the detail login
                        </Text>
                    </View>

                    <View style={loginStyle.form}>
                        <Text style={loginStyle.inputTile}>Email</Text>
                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setEmail(text as any)}
                        />

                        <Text style={loginStyle.inputTile}>Password</Text>

                        <TextInput
                            secureTextEntry={true}
                            style={loginStyle.textInput}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {error && <ErrorText message={error} />}

                        <TouchableOpacity
                            style={loginStyle.forgotPassword}
                            onPress={()=>navigation.navigate(FORGOTPASSWORD_SCREEN)}
                        >
                            <Text style={loginStyle.inputTile}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={loginStyle.buttonWrapper}>
                            <TouchableOpacity style={loginStyle.loginButton} onPress={handleLogin}>
                                {!isLoginProgress ? (
                                    <Text style={{ color: MCOLORS.white, ...MFONTS.h3 }}>
                                        Login
                                    </Text>
                                ) : (
                                    <ActivityIndicator color={MCOLORS.emerald} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={loginStyle.bottomText}
                            onPress={() => navigation.navigate(SIGNUP_SCREEN)}
                        >
                            <Text style={loginStyle.inputTile}>
                                New User?
                                <Text style={{ color: MCOLORS.black }}>Sign Up</Text>
                            </Text>
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
export default Login;
