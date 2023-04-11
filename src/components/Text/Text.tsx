import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { MCOLORS } from '../../consts';

export const ErrorText = ({ message }) => <Text style={styles.errorText}>{message}</Text>;

const styles = StyleSheet.create({
    errorText: {
        color: MCOLORS.red,
    },
});
