/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, { FC, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AddExpenseHeader from '../../components/AddExpenseHeader';
import CustomDatePicker from '../../components/CustomDatePicker';
import InputTitle from '../../components/InputTitle';
import InputWithIcon from '../../components/InputWithIcon';
import SaveBtn from '../../components/SaveBtn';
import { GlobalFormatDate, icons, LOGIN_SCREEN, MCOLORS, MSIZES } from '../../consts';
import { CustomTextInput, TextField } from '../../components/TextInput';

type AddExpenseProps = {
    navigation: any;
};

const AddExpense: FC<AddExpenseProps> = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
        <SafeAreaView style={styles.ADDEXPENSE_SCREEN}>
            <CustomDatePicker open={open} currentDate={date} setOpen={setOpen} setDate={setDate} />

            <View style={{ marginHorizontal: MSIZES.padding }}>
                <AddExpenseHeader header="Add Expense" navigation={navigation} />

                <View style={styles.wrapper}>
                    <InputTitle title={'Amount'} />
                    <InputWithIcon
                        keyboardType="numeric"
                        icon={
                            <View style={styles.usdIcon}>
                                <Text style={{ color: MCOLORS.blue }}>USD</Text>
                            </View>
                        }
                    />

                    <InputTitle title={'Type'} />
                    <CustomTextInput placeholder="travel, food, ..." />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: MSIZES.padding }}>
                            <InputTitle title={'Location'} />
                            <InputWithIcon icon={<Image source={icons.destination} />} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <InputTitle title={'Date'} />
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <InputWithIcon
                                    editable={false}
                                    defaultValue={moment(date).startOf('day').format(GlobalFormatDate)}
                                    icon={<Image source={icons.date} />}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <InputTitle title={'Comment'} />
                    <TextField />

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
