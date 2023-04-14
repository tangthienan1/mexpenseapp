/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
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
import { GlobalFormatDate, icons, MCOLORS, MFONTS, MSIZES } from '../../consts';
import { useSharedState } from '../../contexts';
import { TagType } from '../../type/type';
import { API, graphqlOperation } from 'aws-amplify';
import { createTrip } from '../../graphql/mutations';
import { Tags } from '../../consts/util';

type NewTripProps = {
    navigation: any;
};

const NewTrip: FC<NewTripProps> = ({ navigation }) => {
    const { userData } = useSharedState();
    const [tripName, setTripName] = useState<string | undefined>();
    const [destination, setDestination] = useState<string | undefined>();
    const [budget, setBudget] = useState<number | undefined>();
    const [date, setDate] = useState<any>(new Date());
    const [tag, setTag] = useState<TagType | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [isRequiredRiskAssessment, setIsRequiredRiskAssessment] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    console.log('newTripData', {
        tripName,
        destination,
        budget,
        date,
        tag,
        description,
        isRequiredRiskAssessment,
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleOnSave = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            const newTrip = {
                tripName,
                destination,
                budget,
                date,
                tag,
                description,
                isRequiredRiskAssessment,
                userId: userData.id,
            };
            const addedTrip = await API.graphql(graphqlOperation(createTrip, { input: newTrip }));
            console.log('Trip added obj', newTrip);
            console.log('Trip added', addedTrip);
        } catch (e) {
            console.log('testtttt', (e as any).message)
            Alert.alert((e as any).message);
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.newTripScreen}>
            <CustomDatePicker
                open={isDatePickerOpen}
                currentDate={date}
                setOpen={setIsDatePickerOpen}
                setDate={setDate}
            />

            <ScrollView>
                <View style={styles.newTripWrapper}>
                    <WelcomeUser navigation={navigation} />

                    <View style={styles.logo}>
                        <Image source={icons.logo} />
                    </View>

                    <View style={styles.form}>
                        <Text style={{ ...MFONTS.body1, textAlign: 'center' }}>New Trip</Text>

                        <Text style={styles.inputTile}>Trip name</Text>
                        <CustomTextInput onChangeText={(text) => setTripName(text)} />

                        <Text style={styles.inputTile}>Destination</Text>
                        <CustomTextInput onChangeText={(text) => setDestination(text)} />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: MSIZES.padding }}>
                                <InputTitle title="Budget" />
                                <InputWithIcon
                                    onChangeText={(text) => setBudget(+text)}
                                    icon={<Image source={icons.dollar} />}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <InputTitle title="Date" />
                                <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
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

                        <Text style={styles.inputTile}>Tag</Text>
                        <SelectDropDown setSelected={setTag} data={Tags} />

                        <Text style={styles.inputTile}>Description</Text>
                        <TextField onChangeText={(text) => setDescription(text)} />

                        <Text style={styles.inputTile}>Required Risk Assessment</Text>
                        <View style={{ marginVertical: MSIZES.padding }}>
                            <Switch
                                trackColor={{ false: '#767577', true: MCOLORS.emerald }}
                                thumbColor="#f4f3f4"
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsRequiredRiskAssessment((prev) => !prev)}
                                value={isRequiredRiskAssessment}
                            />
                        </View>

                        <SaveBtn isLoading={isLoading} onPress={handleOnSave} />
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
