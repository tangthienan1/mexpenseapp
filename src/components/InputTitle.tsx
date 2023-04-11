import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MFONTS, MSIZES } from '../consts';

type InputTitleProps = {
    title: string;
};

const InputTitle:FC<InputTitleProps> = ({ title }) => {
    return <Text style={styles.inputTile}>{title}</Text>;
};

export default InputTitle;

const styles = StyleSheet.create({
    inputTile: {
        marginTop: MSIZES.padding,
        ...MFONTS.body3,
    },
});
