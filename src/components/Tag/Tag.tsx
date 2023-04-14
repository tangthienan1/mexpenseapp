import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MCOLORS, MFONTS, MSIZES } from '../../consts';
import { capitalizeFirstLetter } from '../../util';
import { TagType } from '../../type/type';

type TagProps = {
    tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
    const getBackgroundColor = () => {
        switch (tag) {
            case TagType.BUSINESS:
                return MCOLORS.blue;
            case TagType.FAMILY:
                return MCOLORS.yellow;
            case TagType.PERSONAL:
                return MCOLORS.red;
        }
    };
    const getDotColor = () => {
        switch (tag) {
            case TagType.BUSINESS:
                return MCOLORS.emerald;
            case TagType.FAMILY:
                return MCOLORS.blue;
            case TagType.PERSONAL:
                return MCOLORS.white;
        }
    };
    return (
        <View style={[styles.tagWrapper, { backgroundColor: getBackgroundColor() }]}>
            <View style={[styles.dot, { backgroundColor: getDotColor() }]} />
            <Text style={{ ...MFONTS.body4, color: MCOLORS.white }}>{capitalizeFirstLetter(tag)}</Text>
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
