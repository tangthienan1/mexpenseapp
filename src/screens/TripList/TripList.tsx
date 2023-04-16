import { API, Hub, graphqlOperation } from 'aws-amplify';
import React, { FC, useEffect, useRef, useState } from 'react';
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
import TripSummary from '../../components/TripSummary';
import WelcomeUser from '../../components/WelcomeUser';
import { MCOLORS, MSIZES, icons } from '../../consts';
import { HOME_SCREEN, NEWTRIP_SCREEN } from '../../consts/screenName';
import { useSharedState } from '../../contexts';
import { tripsByUserID } from '../../graphql/queries';
import { TripType } from '../../type/type';

type TripListProps = {
    navigation: any;
};

const TripList: FC<TripListProps> = ({ navigation }) => {
    const { userData, updateSharedState } = useSharedState();
    const [tripList, setTripList] = useState<TripType[]>();
    const [filteredTripList, setFilterTripList] = useState<TripType[] | undefined>();
    const searchTextRef = useRef('');

    useEffect(() => {
        const getTripListData = async () => {
            const resp: any = await API.graphql(
                graphqlOperation(tripsByUserID, { userID: userData?.id }) // even use "?" but it will never be undefined when user pass login
            );
            setTripList(resp.data.tripsByUserID.items);
            setFilterTripList(resp.data.tripsByUserID.items);
        };

        getTripListData();
        const hubListenerCancelToken = Hub.listen(NEWTRIP_SCREEN, () => getTripListData());

        return () => hubListenerCancelToken();
    }, [userData]);

    const handleSearchPress = () => {
        if (searchTextRef.current) {
            const newFilterTripList =
                tripList &&
                tripList.filter((tripItem) =>
                    tripItem.tripName.toLowerCase().includes(searchTextRef.current.toLowerCase())
                );
            newFilterTripList && setFilterTripList(newFilterTripList);
        } else {
            setFilterTripList(tripList);
        }
    };

    const handleTripItemPress = (trip: TripType) => {
        updateSharedState({ currentTrip: trip });
        navigation.navigate(HOME_SCREEN);
    };

    function Header() {
        return (
            <View style={styles.headerWrapper}>
                <WelcomeUser navigation={navigation} />
            </View>
        );
    }

    function SearchBar() {
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
    }

    const renderTripItem: ListRenderItem<any> = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleTripItemPress(item)}>
                <TripSummary
                    tripName={item.tripName}
                    date={item.date}
                    tag={item.tag}
                    isRequiredRiskAssessment={item.isRequiredRiskAssessment}
                />
            </TouchableOpacity>
        );
    };

    const renderNote = () => {
        return (
            <FlatList
                ListHeaderComponent={SearchBar}
                contentContainerStyle={{ paddingHorizontal: MSIZES.padding * 3 }}
                numColumns={1}
                data={filteredTripList}
                keyExtractor={(_, index) => `_key${index.toString()}`}
                renderItem={renderTripItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }} />}
            />
        );
    };
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
