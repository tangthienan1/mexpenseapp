import React, { FC } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { MCOLORS, MFONTS, MSIZES } from '../../consts';

type InputWithIconProps = {
    icon: any;
};

const InputWithIcon: FC<{ textError?: any } & InputWithIconProps & TextInputProps> = (props) => {
    return (
        <View>
            <View style={styles.inputWithIcon}>
                {props.icon}
                <TextInput {...props} style={styles.text} />
            </View>
            {props.textError && <Text style={styles.errorField}>{props.textError}</Text>}
        </View>
    );
};

export default InputWithIcon;

const styles = StyleSheet.create({
    inputTile: {
        marginTop: MSIZES.padding,
        ...MFONTS.body3,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 40,
        paddingHorizontal: MSIZES.padding,
        marginVertical: 12,

        borderColor: MCOLORS.darkgray,
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        paddingLeft: MSIZES.base,
    },
    errorField: {
        color: MCOLORS.red,
    },
});
