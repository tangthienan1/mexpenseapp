import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import GoBackWithHeader from '../../components/GoBackWithHeader';
import InputTitle from '../../components/InputTitle';
import SaveBtn from '../../components/SaveBtn';
import { TextField } from '../../components/TextInput';
import { LOGIN_SCREEN, MCOLORS, MSIZES } from '../../consts';

type AddNoteProps = {
    navigation: any;
};

const AddNote: FC<AddNoteProps> = ({ navigation }) => {
    const [noteContent, setNoteContent] = useState<string | undefined>();

    return (
        <SafeAreaView style={styles.ADDEXPENSE_SCREEN}>
            <View style={{ marginHorizontal: MSIZES.padding }}>
                <GoBackWithHeader header="Add Note" navigation={navigation} />

                <View style={styles.wrapper}>
                    <InputTitle title="Note" />
                    <TextField onChangeText={(text) => setNoteContent(text)} />

                    <SaveBtn onPress={() => navigation.navigate(LOGIN_SCREEN)} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddNote;

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
