import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MCOLORS, MFONTS, MSIZES } from '../consts';

type TagProps = {
    tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
    const getBackgroundColor = () => {
        switch (tag) {
            case 'Business':
                return MCOLORS.blue;
            case 'Family':
                return MCOLORS.yellow;
            case 'Personal':
                return MCOLORS.red;
        }
    };
    const getDotColor = () => {
        switch (tag) {
            case 'Business':
                return MCOLORS.emerald;
            case 'Family':
                return MCOLORS.blue;
            case 'Personal':
                return MCOLORS.white;
        }
    };
    return (
        <View style={[styles.tagWrapper, { backgroundColor: getBackgroundColor() }]}>
            <View style={[styles.dot, { backgroundColor: getDotColor() }]} />
            <Text style={{ ...MFONTS.body4, color: MCOLORS.white }}>{tag}</Text>
        </View>
    );
};

export default Tag;

const styles = StyleSheet.create({
    tagWrapper: {
        flexDirection: 'row',
        width: '30%',
        alignItems: 'center',
        padding: 2,
        paddingHorizontal: MSIZES.padding,
        borderRadius: 10,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 50,
        marginRight: 4,
    },
});
