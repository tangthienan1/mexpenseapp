/* eslint-disable react-native/no-inline-styles */
import React, { FC, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Layout from '../../components/Layout';
import WelcomeUser from '../../components/WelcomeUser';
import { ADDNOTE_SCREEN, MCOLORS, MFONTS, MSIZES, icons } from '../../consts';
import { NoteType } from '../../type/type';

const Notes = [
    {
        date: '14 Oct 2022',
        title: 'Meeting Mr',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente perspiciatis atque soluta obcaecati excepturi ipsa molestiae voluptatibus quam nulla numquam, est tempore ullam? Nostrum perspiciatis in quos cupiditate ea!',
    },
    {
        date: '14 Oct 2022',
        title: 'Meeting 1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente perspiciatis atque soluta obcaecati excepturi ipsa molestiae voluptatibus quam nulla numquam, est tempore ullam? Nostrum perspiciatis in quos cupiditate ea!',
    },
    {
        date: '14 Oct 2022',
        title: 'Meeting 2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente perspiciatis atque soluta obcaecati excepturi ipsa molestiae voluptatibus quam nulla numquam, est tempore ullam? Nostrum perspiciatis in quos cupiditate ea!',
    },
    {
        date: '14 Oct 2022',
        title: 'Meeting 3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente perspiciatis atque soluta obcaecati excepturi ipsa molestiae voluptatibus quam nulla numquam, est tempore ullam? Nostrum perspiciatis in quos cupiditate ea!',
    },
];

type NoteProps = {
    navigation: any;
};

const Note: FC<NoteProps> = ({ navigation }) => {
    const [filteredNoteList, setFilterNoteList] = useState<NoteType[]>(Notes);
    const searchTextRef = useRef('');

    const handleSearchPress = () => {
        if (searchTextRef.current) {
            const newFilterNoteList =
                Notes &&
                Notes.filter((noteItem) =>
                    noteItem.title.toLowerCase().includes(searchTextRef.current.toLowerCase())
                );
            newFilterNoteList && setFilterNoteList(newFilterNoteList);
        } else {
            setFilterNoteList(Notes);
        }
    };

    const Header = () => {
        return (
            <View style={styles.headerWrapper}>
                <WelcomeUser
                    navigation={navigation}
                    toolIcon={icons.addnote}
                    toolSourceNavigate={ADDNOTE_SCREEN}
                />
            </View>
        );
    };

    const HeaderComponent = () => {
        return (
            <View>
                <Header />
                <View style={[styles.searchSection, styles.border]}>
                    <TextInput
                        defaultValue={searchTextRef.current}
                        placeholder="Search"
                        onChangeText={(searchText) => (searchTextRef.current = searchText)}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={handleSearchPress}>
                        <Image style={{ width: 16, height: 16 }} source={icons.search} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const renderItem: ListRenderItem<NoteType> = ({ item }) => {
        return item ? (
            <View style={styles.noteItemWrapper}>
                <Text style={{ ...MFONTS.h4, marginVertical: MSIZES.padding }}>{item.date}</Text>
                <View style={[styles.noteItem, styles.border]}>
                    <Text style={{ ...MFONTS.h4 }}>{item.title}</Text>
                    <Text style={{ ...MFONTS.body4, color: MCOLORS.darkgray }}>{item.content}</Text>
                </View>
            </View>
        ) : (
            <Text>No note available</Text>
        );
    };

    function renderNote() {
        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: MSIZES.padding * 3 }}
                numColumns={1}
                data={filteredNoteList}
                keyExtractor={(item, index) => `_key${index.toString()}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }} />}
            />
        );
    }
    return <Layout>{renderNote()}</Layout>;
};

const styles = StyleSheet.create({
    noteItemWrapper: {
        marginVertical: MSIZES.padding,
    },
    noteItem: {
        padding: MSIZES.base,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginVertical: MSIZES.padding * 2,
        paddingVertical: MSIZES.base,
        paddingHorizontal: MSIZES.padding,
    },
    headerWrapper: {
        flex: 1,
        marginTop: MSIZES.padding * 2,
        flexDirection: 'row',
    },
    border: {
        borderColor: MCOLORS.darkgray,
        borderWidth: 1,
        borderRadius: 10,
    },
});
export default Note;
