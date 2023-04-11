import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons, MFONTS, MSIZES } from '../consts';

type AccountOptionProps = {
    header: string;
    navigation: any;
};

const AddExpenseHeader:FC<AccountOptionProps> = ({ header, navigation }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.image} onPress={() => navigation.goBack()}>
                <Image style={styles.image} source={icons.back} />
            </TouchableOpacity>
            <Text style={{ ...MFONTS.body1 }}>{header}</Text>
        </View>
    );
};

export default AddExpenseHeader;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: MSIZES.padding2,
    },
    image: {
        width: 25,
        height: 20,
        position: 'absolute',
        left: 0,
    },
});
