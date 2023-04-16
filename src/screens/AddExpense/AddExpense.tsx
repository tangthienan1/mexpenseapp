import moment from 'moment';
import React, { FC, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { API, Hub, graphqlOperation } from 'aws-amplify';
import CustomDatePicker from '../../components/CustomDatePicker';
import GoBackWithHeader from '../../components/GoBackWithHeader';
import InputTitle from '../../components/InputTitle';
import InputWithIcon from '../../components/InputWithIcon';
import SaveBtn from '../../components/SaveBtn';
import { CustomTextInput, TextField } from '../../components/TextInput';
import {
    ADDEXPENSE_SCREEN,
    GlobalFormatDate,
    MCOLORS,
    MSIZES,
    icons
} from '../../consts';
import { HOME_SCREEN } from '../../consts/screenName';
import { useSharedState } from '../../contexts';
import { createExpense } from '../../graphql/mutations';

type AddExpenseProps = {
    navigation: any;
};

const AddExpense: FC<AddExpenseProps> = ({ navigation }) => {
    const { currentTrip } = useSharedState();
    const [open, setOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | undefined>();
    const [type, setType] = useState<string | undefined>();
    const [location, setLocation] = useState<string | undefined>();
    const [date, setDate] = useState<Date>(new Date());
    const [comment, setComment] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnSave = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            Hub.dispatch(ADDEXPENSE_SCREEN, {
                event: 'addExpense',
            });
            const newExpenseObj = {
                amount,
                type,
                location,
                date,
                comment,
                tripID: currentTrip?.id,
            };
            console.log({ newExpenseObj });
            await API.graphql(graphqlOperation(createExpense, { input: newExpenseObj }));
            // reset();
            navigation.navigate(HOME_SCREEN);
        } catch (e) {
            Alert.alert((e as any).message);
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.ADDEXPENSE_SCREEN}>
            <CustomDatePicker open={open} currentDate={date} setOpen={setOpen} setDate={setDate} />

            <View style={{ marginHorizontal: MSIZES.padding }}>
                <GoBackWithHeader header="Add Expense" navigation={navigation} />

                <View style={styles.wrapper}>
                    <InputTitle title="Amount" />
                    <InputWithIcon
                        keyboardType="numeric"
                        icon={
                            <View style={styles.usdIcon}>
                                <Text style={{ color: MCOLORS.blue }}>USD</Text>
                            </View>
                        }
                        onChangeText={(text) => setAmount(+text)}
                    />

                    <InputTitle title="Type" />
                    <CustomTextInput
                        onChangeText={(text) => setType(text)}
                        placeholder="travel, food, ..."
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: MSIZES.padding }}>
                            <InputTitle title="Location" />
                            <InputWithIcon
                                onChangeText={(text) => setLocation(text)}
                                icon={<Image source={icons.destination} />}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <InputTitle title="Date" />
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <InputWithIcon
                                    editable={false}
                                    defaultValue={moment(date)
                                        .startOf('day')
                                        .format(GlobalFormatDate)}
                                    icon={<Image source={icons.date} />}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <InputTitle title="Comment" />
                    <TextField onChangeText={(text) => setComment(text)} />

                    <SaveBtn isLoading={isLoading} onPress={handleOnSave} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddExpense;

const styles = StyleSheet.create({
    ADDEXPENSE_SCREEN: {
        flex: 1,
        backgroundColor: MCOLORS.white,
    },
    wrapper: {
        marginHorizontal: MSIZES.padding * 2,
        marginTop: MSIZES.padding,
    },
    usdIcon: {
        paddingHorizontal: MSIZES.padding,
        paddingVertical: MSIZES.padding / 2,

        borderWidth: 1,
        borderColor: MCOLORS.darkgray,
    },
});
