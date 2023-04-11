import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AccountScreen, icons, MFONTS, MSIZES } from '../consts';

type WelcomeUserProps = {
    navigation: any;
}

const WelcomeUser: FC<WelcomeUserProps> = ({ navigation }) => {
    const tempUserName = "Andy"
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(AccountScreen)}
            style={styles.WelcomeUserWrapper}
        >
            <Image style={styles.img} source={icons.emptyAvatar} />
            <Text style={{ ...MFONTS.body2, marginHorizontal: MSIZES.padding }}>Hi {tempUserName}!</Text>
        </TouchableOpacity>
    );
};

export default WelcomeUser;
const styles = StyleSheet.create({
    img: {
        width: 32,
        height: 32,
    },
    WelcomeUserWrapper: {
        flexDirection: 'row',
    },
});
