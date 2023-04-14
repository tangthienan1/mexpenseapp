import { API, Hub, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import CustomDatePicker from '../../components/CustomDatePicker';
import InputTitle from '../../components/InputTitle';
import InputWithIcon from '../../components/InputWithIcon';
import SaveBtn from '../../components/SaveBtn';
import SelectDropDown from '../../components/SelectDropDown';
import { CustomTextInput, TextField } from '../../components/TextInput';
import WelcomeUser from '../../components/WelcomeUser';
import { GlobalFormatDate, MCOLORS, MFONTS, MSIZES, TRIPLIST_SCREEN, icons } from '../../consts';
import { TagOptions } from '../../consts/common';
import { NEWTRIP_SCREEN } from '../../consts/screenName';
import { useSharedState } from '../../contexts';
import { createTrip } from '../../graphql/mutations';
import { TagType } from '../../type/type';

type NewTripProps = {
    navigation: any;
};

type TFormTrip = {
    tripName: string;
    destination: string;
    budget: number;
    date: Date;
    tag: TagType;
    description: string;
    isRequiredRiskAssessment: boolean;
};

const NewTrip: FC<NewTripProps> = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm<TFormTrip | any>();
    const { userData } = useSharedState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [date, setDate] = useState<any>(new Date());

    const handleOnSave = async (data: TFormTrip) => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            Hub.dispatch(NEWTRIP_SCREEN, {
                event: 'addTrip',
            });
            const newTripObj = {
                ...data,
                userID: userData?.id,
            };
            console.log({ newTripObj });
            await API.graphql(graphqlOperation(createTrip, { input: newTripObj }));
            reset();
            navigation.navigate(TRIPLIST_SCREEN);
        } catch (e) {
            Alert.alert((e as any).message);
        }

        setIsLoading(false);
    };
    const onError: SubmitErrorHandler<TFormTrip> = (errors, e) => {
        return console.log(errors);
    };

    return (
        <SafeAreaView style={styles.newTripScreen}>
            <ScrollView>
                <View style={styles.newTripWrapper}>
                    <WelcomeUser navigation={navigation} />

                    <View style={styles.logo}>
                        <Image source={icons.logo} />
                    </View>

                    <View style={styles.form}>
                        <Text style={{ ...MFONTS.body1, textAlign: 'center' }}>New Trip</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text style={styles.inputTile}>Trip name</Text>
                                    <CustomTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        textError={
                                            errors.tripName ? errors.destination?.message : ''
                                        }
                                    />
                                </View>
                            )}
                            name="tripName"
                            rules={{
                                required: { value: true, message: 'Field is required' },
                            }}
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text style={styles.inputTile}>Destination</Text>
                                    <CustomTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        textError={
                                            errors.destination ? errors.destination?.message : ''
                                        }
                                    />
                                </View>
                            )}
                            name="destination"
                            rules={{
                                required: { value: true, message: 'Field is required' },
                            }}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: MSIZES.padding }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <InputTitle title="Budget" />
                                            <InputWithIcon
                                                value={value}
                                                onChangeText={onChange}
                                                icon={<Image source={icons.dollar} />}
                                            />
                                        </View>
                                    )}
                                    name="budget"
                                    // rules={{
                                    //     required: { value: true, message: 'Field is required' },
                                    // }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => setIsDatePickerOpen(true)}
                                            >
                                                <InputTitle title="Date" />
                                                <InputWithIcon
                                                    editable={false}
                                                    defaultValue={moment(date)
                                                        .startOf('day')
                                                        .format(GlobalFormatDate)}
                                                    icon={<Image source={icons.date} />}
                                                />
                                            </TouchableOpacity>
                                            <CustomDatePicker
                                                open={isDatePickerOpen}
                                                currentDate={date}
                                                setOpen={setIsDatePickerOpen}
                                                setDate={(value) => {
                                                    setDate(value);
                                                    onChange(value);
                                                }}
                                            />
                                        </View>
                                    )}
                                    name="date"
                                    // rules={{ required: true }}
                                />
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <View>
                                    <Text style={styles.inputTile}>Tag</Text>
                                    <SelectDropDown setSelected={onChange} data={TagOptions} />
                                </View>
                            )}
                            name="tag"
                            // rules={{ required: true }}
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <View>
                                    <Text style={styles.inputTile}>Destination</Text>
                                    <TextField value={value} onChangeText={onChange} />
                                </View>
                            )}
                            name="description"
                            // rules={{ required: true }}
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <View>
                                    <Text style={styles.inputTile}>Required Risk Assessment</Text>
                                    <View style={{ marginVertical: MSIZES.padding }}>
                                        <Switch
                                            trackColor={{ false: '#767577', true: MCOLORS.emerald }}
                                            thumbColor="#f4f3f4"
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                </View>
                            )}
                            name="isRequiredRiskAssessment"
                            // rules={{ required: true }}
                        />

                        <SaveBtn
                            isLoading={isLoading}
                            onPress={handleSubmit(handleOnSave, onError)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewTrip;

const styles = StyleSheet.create({
    newTripScreen: {
        flex: 1,
        backgroundColor: MCOLORS.white,
    },
    newTripWrapper: {
        paddingHorizontal: MSIZES.padding,
        marginBottom: 100,
    },
    logo: {
        paddingTop: MSIZES.padding * 2,
        alignItems: 'center',
    },
    form: {
        paddingTop: MSIZES.padding * 2,
        paddingHorizontal: MSIZES.padding2 * 2,
    },
    inputTile: {
        marginTop: MSIZES.padding,
        ...MFONTS.body3,
    },
    errorField: {
        color: MCOLORS.red,
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
    saveButton: {
        marginTop: MSIZES.padding,
        height: 40,
        borderRadius: 20,
        backgroundColor: MCOLORS.emerald,

        justifyContent: 'center',
        alignItems: 'center',
    },
});
