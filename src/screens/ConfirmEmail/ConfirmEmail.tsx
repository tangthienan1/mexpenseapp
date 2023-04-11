import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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
import { LOGIN_SCREEN, MCOLORS, MFONTS, MSIZES, SIGNUP_SCREEN, icons } from '../../consts';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

type RouteParamProps = {
    email: string;
};

type ConfirmEmailRouteProp = RouteProp<ParamListBase> & {
    params: RouteParamProps;
};

type ConfirmEmailProps = {
    navigation: any;
};

const ConfirmEmail: FC<ConfirmEmailProps> = ({ navigation }) => {
    const route = useRoute<ConfirmEmailRouteProp>();
    const email = route?.params?.email
    
    const [error, setError] = useState<string | undefined>();
    const [confirmCode, setConfirmCode] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onResendCodePress = async () => {
        try {
            await Auth.resendSignUp(email)
            Alert.alert("Success")
        } catch (e) {
            Alert.alert((e as any).message)
        }
    };

    const handleConfirm = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        if (email && confirmCode) {
            try {
                await Auth.confirmSignUp(email, confirmCode);
                navigation.navigate(LOGIN_SCREEN)
            } catch (e) {
                Alert.alert((e as any).message);
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
                            Confirm your email
                        </Text>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.body3 }}>
                            Verify your email for security
                        </Text>
                    </View>

                    <View style={loginStyle.form}>
                        <Text style={loginStyle.inputTile}>Email</Text>
                        <TextInput
                            value={email} 
                            style={loginStyle.textInput}
                            editable={false}
                        />

                        <Text style={loginStyle.inputTile}>Code</Text>

                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setConfirmCode(text)}
                        />
                        {error && <ErrorText message={error} />}

                        <TouchableOpacity style={loginStyle.resendCode} onPress={onResendCodePress}>
                            <Text style={loginStyle.inputTile}>Resend</Text>
                        </TouchableOpacity>
                        <View style={loginStyle.buttonWrapper}>
                            <TouchableOpacity style={loginStyle.loginButton} onPress={handleConfirm}>
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
                            <Text style={loginStyle.inputTile}>
                                Already have an account? {' '}
                                <Text style={{ color: MCOLORS.black }}>Login</Text>
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
    resendCode: {
        alignItems: 'flex-start',
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
export default ConfirmEmail;
