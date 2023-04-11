import React, { FC, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ErrorText } from '../components/Text/Text';
import { icons, LoginScreen, MCOLORS, MFONTS, MSIZES } from '../consts';
import { loginStyle } from './Login';

type SignUpProps = {
    navigation?: any;
};

type ErrorType = {
    email?: string;
    password?: string;
    reEnPassword?: string;
    signUp?: string;
};

const SignUp: FC<SignUpProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<ErrorType>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validatePassword = (inputPassword: string) => {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(inputPassword)) {
            setError({ ...error, ...{ password: 'Invalid password' } });
            return;
        }
        setError({ ...error, ...{ password: undefined } });
    };

    const validateEmail = (inputEmail: string) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) {
            setError({ ...error, ...{ email: 'Invalid email' } });
            return;
        }
        setError({ ...error, ...{ email: undefined } });
    };

    const validateReEnPassword = (inputReEnPassword: string) => {
        if (password !== inputReEnPassword) {
            setError({ ...error, ...{ reEnPassword: 'Re-Enter Password not match' } });
            return;
        }
        setError({ ...error, ...{ reEnPassword: undefined } });
    };

    const handleSignUp = () => {
        if (email && password && !error?.email && !error?.password && !error?.reEnPassword) {
            setIsLoading(true);
            // auth()
            //     .createUserWithEmailAndPassword(email, password)
            //     .then(() => {
            //         setIsLoading(false);
            //         navigation.navigate('Login');
            //     })
            //     .catch((err) => {
            //         setIsLoading(false);
            //         // console.log({ err });
            //         setError({ ...error, ...{ signUp: 'Something went wrong' } });
            //     });
        } else {
            setError({ ...error, ...{ signUp: 'You have to complete the form!!' } });
        }
    };

    return (
        <KeyboardAvoidingView style={loginStyle.login}>
            <LinearGradient colors={[MCOLORS.lime, MCOLORS.emerald]} style={loginStyle.login}>
                <ScrollView>
                    <View style={[loginStyle.logo, { marginTop: MSIZES.padding * 6 }]}>
                        <Image source={icons.logo} />
                    </View>

                    <View style={loginStyle.title}>
                        <Text style={{ color: MCOLORS.lightGreen, ...MFONTS.h1 }}>SignUp</Text>
                        <Text style={{ color: MCOLORS.lightGreen }}>
                            Please enter the detail to get started
                        </Text>
                    </View>

                    <View style={loginStyle.form}>
                        {/* <Text style={loginStyle.inputTile}>Name</Text>
                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setName(text)}
                        /> */}

                        <Text style={loginStyle.inputTile}>Email</Text>
                        <TextInput
                            style={loginStyle.textInput}
                            onChangeText={(text) => setEmail(text)}
                            onBlur={(e) => validateEmail(e.nativeEvent.text)}
                        />
                        {error?.email && <ErrorText message={error.email} />}

                        <Text style={loginStyle.inputTile}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={loginStyle.textInput}
                            onChangeText={(text) => setPassword(text)}
                            onBlur={(e) => validatePassword(e.nativeEvent.text)}
                        />
                        {error?.password && (
                            <View>
                                <ErrorText message="l. Contain at least 8 characters" />
                                <ErrorText message="2. Contain at least 1 number" />
                                <ErrorText message="3. Contain at least 1 lowercase character (a-z)" />
                                <ErrorText message="4. Contain at least 1 uppercase character (A-Z) contains only 0-9a-zA-Z" />
                            </View>
                        )}

                        <Text style={loginStyle.inputTile}>Re-Enter Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={loginStyle.textInput}
                            onBlur={(e) => validateReEnPassword(e.nativeEvent.text)}
                        />
                        {error?.reEnPassword && <ErrorText message={error.reEnPassword} />}

                        <View style={loginStyle.buttonWrapper}>
                            <TouchableOpacity style={loginStyle.loginButton} onPress={handleSignUp}>
                                {!isLoading ? (
                                    <Text style={{ color: MCOLORS.white, ...MFONTS.h3 }}>
                                        SignUp
                                    </Text>
                                ) : (
                                    <ActivityIndicator color={MCOLORS.emerald} />
                                )}
                            </TouchableOpacity>
                        </View>
                        {error?.signUp && <ErrorText message={error.signUp} />}

                        <TouchableOpacity
                            style={loginStyle.bottomText}
                            onPress={() => navigation.navigate(LoginScreen)}
                        >
                            <Text style={loginStyle.inputTile}>
                                Already have an account?
                                <Text style={{ color: MCOLORS.black }}>Login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};
export default SignUp;
