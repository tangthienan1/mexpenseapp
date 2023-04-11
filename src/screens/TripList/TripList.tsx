/* eslint-disable react-native/no-inline-styles */
import React, { FC, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Layout from '../../components/Layout';
import TripSummary, { TripSummaryProps } from '../../components/TripSummary';
import WelcomeUser from '../../components/WelcomeUser';
import { icons, MCOLORS, MSIZES } from '../../consts';

const Trips = [
    {
        tripName: "Meeting Mr Cock (Apple's CEO)",
        date: '14 - oct - 2022',
        tag: 'Business',
        isRequiredRiskAssessment: true,
    },
    {
        tripName: 'Cultural Training',
        date: '14 - oct - 2022',
        tag: 'Business',
        isRequiredRiskAssessment: true,
    },
    {
        tripName: "Meeting Mr Cock (Apple's CEO)",
        date: '14 - oct - 2022',
        tag: 'Family',
        isRequiredRiskAssessment: true,
    },
    {
        tripName: "Meeting Mr Cock (Apple's CEO)",
        date: '14 - oct - 2022',
        tag: 'Personal',
        isRequiredRiskAssessment: false,
    },
];

type TripListProps = {
    navigation: any;
};

const TripList:FC<TripListProps> = ({ navigation }) => {
    const [filteredTripList, setFilterTripList] = useState<TripSummaryProps[]>(Trips);
    const searchTextRef = useRef('');

    const Header = () => {
        return (
            <View style={styles.headerWrapper}>
                <WelcomeUser navigation={navigation} />
            </View>
        );
    };

    const handleSearchPress = () => {
        if (searchTextRef.current) {
            const newFilterTripList =
                Trips &&
                Trips.filter((tripItem) =>
                    tripItem.tripName.toLowerCase().includes(searchTextRef.current.toLowerCase())
                );
            newFilterTripList && setFilterTripList(newFilterTripList);
        } else {
            setFilterTripList(Trips);
        }
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
    const renderItem: ListRenderItem<TripSummaryProps> = ({ item }) => {
        return (
            <TouchableOpacity>
                <TripSummary
                    tripName={item.tripName}
                    date={item.date}
                    tag={item.tag}
                    isRequiredRiskAssessment={item.isRequiredRiskAssessment}
                />
            </TouchableOpacity>
        );
    };

    function renderNote() {
        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: MSIZES.padding * 3 }}
                numColumns={1}
                data={filteredTripList}
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
    tripItemWrapper: {
        padding: MSIZES.padding * 1.5,
        marginVertical: MSIZES.padding,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: MCOLORS.gray,
        backgroundColor: 'white',

        shadowColor: MCOLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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

export default TripList;
