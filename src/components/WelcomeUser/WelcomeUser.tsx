import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ACCOUNT_SCREEN, icons, MFONTS, MSIZES } from '../../consts';
import { useSharedState } from '../../contexts';

type WelcomeUserProps = {
    navigation: any;
    avatar?: any;
    toolIcon?: any;
    toolSourceNavigate?: string;
};

const WelcomeUser: FC<WelcomeUserProps> = ({
    navigation,
    avatar,
    toolIcon,
    toolSourceNavigate,
}) => {
    const { userData } = useSharedState();
    const userName = userData?.name;
    return (
        <View style={styles.WelcomeUserWrapper}>
            <TouchableOpacity
                style={styles.account}
                onPress={() => navigation.navigate(ACCOUNT_SCREEN)}
            >
                <Image style={styles.img} source={avatar || icons.emptyAvatar} />
                <Text style={{ ...MFONTS.body2, marginHorizontal: MSIZES.padding }}>
                    Hi {userName}!
                </Text>
            </TouchableOpacity>
            {toolIcon && (
                <TouchableOpacity onPress={() => navigation.navigate(toolSourceNavigate)}>
                    <Image style={styles.img} source={toolIcon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default WelcomeUser;
const styles = StyleSheet.create({
    img: {
        width: 32,
        height: 32,
    },
    WelcomeUserWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    account: {
        flexDirection: 'row',
    },
});
