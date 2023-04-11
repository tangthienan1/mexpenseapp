/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { icons, MCOLORS, MSIZES } from '../../consts';

type DataType = {
    key: string;
    value: string;
};

type SelectDropDownProps = {
    setSelected: any;
    placeholder?: string;
    maxHeight?: number;
    data: Array<DataType>;
    defaultOption?: { key: any; value: any };
    onSelect?: () => void;
};

const SelectDropDown: FC<SelectDropDownProps> = ({
    setSelected,
    placeholder,
    maxHeight,
    data,
    defaultOption,
    onSelect = () => {},
}) => {
    const oldOption = useRef(null);
    const [_firstRender, _setFirstRender] = useState<boolean>(true);
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [selectedVal, setSelectedVal] = useState<any>('');
    const [height, setHeight] = useState<number>(200);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [filteredData, setFilteredData] = useState<DataType[]>(data);

    const slideDown = () => {
        setDropdown(true);
        Animated.timing(animatedValue, {
            toValue: height,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    const slideUp = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => setDropdown(false));
    };

    useEffect(() => {
        if (maxHeight) {
            setHeight(maxHeight);
        }
    }, [maxHeight]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (_firstRender) {
            _setFirstRender(false);
            return;
        }
        onSelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVal]);

    useEffect(() => {
        if (
            !_firstRender &&
            defaultOption &&
            oldOption.current !== defaultOption.key &&
            oldOption.current != null
        ) {
            oldOption.current = defaultOption.key;
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        if (defaultOption && _firstRender && defaultOption.key !== undefined) {
            oldOption.current = defaultOption.key;
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultOption]);

    return (
        <View>
            <TouchableOpacity
                style={[styles.wrapper, styles.border]}
                onPress={() => {
                    if (!dropdown) {
                        slideDown();
                    } else {
                        slideUp();
                    }
                }}
            >
                <Text>
                    {selectedVal === ''
                        ? placeholder
                            ? placeholder
                            : 'Select option'
                        : selectedVal}
                </Text>
                <Image source={icons.arrow} resizeMode="contain" style={dropdown && styles.arrow} />
            </TouchableOpacity>

            {dropdown ? (
                <Animated.View style={{ maxHeight: animatedValue }}>
                    <ScrollView
                        style={[styles.dropdown, styles.border]}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        nestedScrollEnabled={true}
                    >
                        {filteredData.map(({ key, value }, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.option]}
                                    key={index}
                                    onPress={() => {
                                        setSelected(key);
                                        setSelectedVal(value);
                                        slideUp();
                                        setTimeout(() => setFilteredData(data), 800);
                                    }}
                                >
                                    <Text>{value}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </Animated.View>
            ) : null}
        </View>
    );
};

export default SelectDropDown;

const styles = StyleSheet.create({
    wrapper: {
        padding: MSIZES.padding,
        marginVertical: MSIZES.padding2,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        height: 40,
    },
    dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10 },
    option: { padding: MSIZES.padding },
    border: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: MCOLORS.darkgray,
    },
    arrow: { transform: [{ rotate: '180deg' }] },
});
