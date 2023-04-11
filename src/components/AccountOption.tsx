import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { icons, MCOLORS, MSIZES } from '../consts';

type AccountOptionProps = {
    onPress?: () => void;
    title: string;
    icon?: any;
};

const AccountOption: FC<AccountOptionProps> = ({ onPress, title, icon }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text>{title}</Text>
            {icon}
            <Image source={icons.rightarrow} />
        </TouchableOpacity>
    );
};

export default AccountOption;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: MSIZES.padding,
        marginBottom: MSIZES.padding,

        borderWidth: 1,
        borderColor: MCOLORS.gray,
        borderRadius: 5,
    },
});
