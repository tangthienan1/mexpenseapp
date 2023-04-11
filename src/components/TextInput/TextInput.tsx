import React, { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { MCOLORS, MSIZES } from '../../consts';

export const TextField: FC<{ height?: number } & TextInputProps> = (props) => {
    return (
        <TextInput
            multiline
            style={[styles.textInput, { height: props.height || 80 }]}
            {...props}
        />
    );
};

export const CustomTextInput: FC<TextInputProps> = (props) => {
    return <TextInput style={styles.textInput} {...props} />;
};

const styles = StyleSheet.create({
    textInput: {
        marginVertical: MSIZES.padding2,
        padding: MSIZES.padding,
        height: MSIZES.padding * 4,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: MCOLORS.darkgray,
    },
});
