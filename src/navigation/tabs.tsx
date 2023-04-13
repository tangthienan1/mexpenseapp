import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { icons, MCOLORS } from '../consts';
import { Account, HomeScreen, NewTrip, Note, TripList } from '../screens';

const Tab = createBottomTabNavigator();

type NewTripButtonProps = {
    children: any;
    onPress?: (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
      ) => void;
};

const NewTripButton: FC<NewTripButtonProps> = ({ children, onPress }) => {
    return (
        <View style={styles.selectedBtnWrapper}>
            <View style={styles.curve}>
                <View style={styles.buttonSpacer} />
                <Svg width={75} height={61} viewBox="0 0 75 61">
                    <Path
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={MCOLORS.white}
                    />
                </Svg>
                <View style={styles.buttonSpacer} />
            </View>

            <TouchableOpacity style={styles.newTripBtn} onPress={onPress}>
                {children}
            </TouchableOpacity>
        </View>
    );
};

type TabBarCustomButtonProps = {
    accessibilityState: any;
    children: any;
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
};

const TabBarCustomButton: FC<TabBarCustomButtonProps> = ({
    accessibilityState,
    children,
    onPress,
}) => {
    var isSelected = accessibilityState.selected;

    if (isSelected) {
        return (
            <View style={styles.selectedBtnWrapper}>
                <View style={styles.curve}>
                    <View style={styles.buttonSpacer} />
                    <Svg width={75} height={61} viewBox="0 0 75 61">
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={MCOLORS.white}
                        />
                    </Svg>
                    <View style={styles.buttonSpacer} />
                </View>

                <TouchableOpacity style={styles.selectBtn} onPress={onPress}>
                    {children}
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={styles.unSelectedBtn} activeOpacity={1} onPress={onPress}>
                {children}
            </TouchableOpacity>
        );
    }
};

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                },
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                ...styles.tabIcon,
                                tintColor: focused ? MCOLORS.white : MCOLORS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: ({ accessibilityState, children, onPress }) => (
                        <TabBarCustomButton
                            accessibilityState={accessibilityState}
                            children={children}
                            onPress={onPress}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Note"
                component={Note}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.note}
                            resizeMode="contain"
                            style={{
                                ...styles.tabIcon,
                                tintColor: focused ? MCOLORS.white : MCOLORS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: ({ accessibilityState, children, onPress }) => (
                        <TabBarCustomButton
                            accessibilityState={accessibilityState}
                            children={children}
                            onPress={onPress}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="NewTrip"
                component={NewTrip}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.plus}
                            resizeMode="contain"
                            style={{
                                ...styles.tabIcon,
                                tintColor: focused ? MCOLORS.white : MCOLORS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: ({ children, onPress }) => (
                        <NewTripButton children={children} onPress={onPress} />
                    ),
                }}
            />
            <Tab.Screen
                name="TripList"
                component={TripList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.list}
                            resizeMode="contain"
                            style={{
                                ...styles.tabIcon,
                                tintColor: focused ? MCOLORS.white : MCOLORS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: ({ accessibilityState, children, onPress }) => (
                        <TabBarCustomButton
                            accessibilityState={accessibilityState}
                            children={children}
                            onPress={onPress}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.account}
                            resizeMode="contain"
                            style={{
                                ...styles.tabIcon,
                                tintColor: focused ? MCOLORS.white : MCOLORS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: ({ accessibilityState, children, onPress }) => (
                        <TabBarCustomButton
                            accessibilityState={accessibilityState}
                            children={children}
                            onPress={onPress}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    newTripBtn: {
        top: -30.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: MCOLORS.primary,

        shadowColor: MCOLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

        elevation: 45,
    },
    selectBtn: {
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: MCOLORS.primary,

        shadowColor: MCOLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

        elevation: 45,
    },
    unSelectedBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: MCOLORS.white,
    },
    selectedBtnWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: MCOLORS.white,
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    curve: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        backgroundColor: MCOLORS.primary,
        opacity: 0.2,
    },
    buttonSpacer: {
        flex: 1,
        backgroundColor: MCOLORS.white,
    },
});

export default Tabs;
