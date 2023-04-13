import moment from 'moment';
import React, { FC, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GoBackWithHeader from '../../components/GoBackWithHeader';
import CustomDatePicker from '../../components/CustomDatePicker';
import InputTitle from '../../components/InputTitle';
import InputWithIcon from '../../components/InputWithIcon';
import SaveBtn from '../../components/SaveBtn';
import { CustomTextInput, TextField } from '../../components/TextInput';
import { GlobalFormatDate, LOGIN_SCREEN, MCOLORS, MSIZES, icons } from '../../consts';

type AddExpenseProps = {
    navigation: any;
};

const AddExpense: FC<AddExpenseProps> = ({ navigation }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | undefined>();
    const [type, setType] = useState<string | undefined>();
    const [location, setLocation] = useState<string | undefined>();
    const [date, setDate] = useState<Date>(new Date());
    const [comment, setComment] = useState<string | undefined>();

    console.log('add expense', { amount, type, location, date, comment });

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

                    <SaveBtn onPress={() => navigation.navigate(LOGIN_SCREEN)} />
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
