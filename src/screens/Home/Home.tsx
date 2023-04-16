import { API, Hub, graphqlOperation } from 'aws-amplify';
import React, { FC, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Layout from '../../components/Layout';
import TripSummary from '../../components/TripSummary';
import WelcomeUser from '../../components/WelcomeUser';
import {
    ADDEXPENSE_SCREEN,
    MCOLORS,
    MFONTS,
    MSIZES,
    NOTE_SCREEN,
    TRIPLIST_SCREEN,
    icons,
} from '../../consts';
import { NEWTRIP_SCREEN } from '../../consts/screenName';
import { useSharedState } from '../../contexts';
import { expensesByTripID } from '../../graphql/queries';
import { ExpenseType } from '../../type/type';
import moment from 'moment';
import { DisplayFormatDate } from '../../consts/common';

type HomeScreenProps = {
    navigation: any;
};

const Home: FC<HomeScreenProps> = ({ navigation }) => {
    const { currentTrip } = useSharedState();

    console.log({ currentTrip });

    const [expenseList, setExpenseList] = useState<ExpenseType[]>([]);

    useEffect(() => {
        const getTripExpense = async () => {
            const resp: any = await API.graphql(
                graphqlOperation(expensesByTripID, { tripID: currentTrip?.id })
            );
            const expenseList: ExpenseType[] = resp.data.expensesByTripID.items;

            setExpenseList(expenseList);
        };
        getTripExpense();

        const addExpenseListener = (data: any) => {
            if (data.payload.event === 'addExpense') {
                getTripExpense();
            }
        };

        const hubListenerCancelToken = Hub.listen(ADDEXPENSE_SCREEN, addExpenseListener);

        return () => hubListenerCancelToken();
    }, [currentTrip]);

    //ExpenseList max length is 8 for display on banner
    const sortedExpenseList = expenseList?.sort((prev, next) => -prev.amount + next.amount);
    const uniqueExpenseListByValue = [
        ...new Map(sortedExpenseList?.map((item) => [item.amount, item])).values(),
    ];
    const majorExpenseList = uniqueExpenseListByValue.slice(0, 6);

    function renderHeader() {
        return (
            <View style={styles.headerWrapper}>
                <WelcomeUser navigation={navigation} />
            </View>
        );
    }

    function renderBanner() {
        const totalExpense = expenseList?.reduce((accumulator, expense) => {
            return accumulator + expense.amount;
        }, 0);

        const BannerHeader = () => {
            return (
                <View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={{ ...MFONTS.h4 }}>Total Expense</Text>
                        <Text style={{ ...MFONTS.h4 }}>$ {totalExpense}</Text>
                    </View>
                    <Text style={{ ...MFONTS.body2 }}>Top expenses</Text>
                </View>
            );
        };

        const renderMajorItem: ListRenderItem<ExpenseType> = ({ item }) => (
            <View
                style={{
                    flexDirection: 'row',
                    marginRight: MSIZES.padding,
                }}
            >
                <Text style={{ ...MFONTS.body4 }}>{item.type}</Text>
                <Text style={{ ...MFONTS.body4, paddingLeft: 8 }}>${item.amount}</Text>
            </View>
        );

        return (
            <FlatList
                ListHeaderComponent={BannerHeader}
                data={majorExpenseList}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={(_, index) => `_key${index.toString()}`}
                renderItem={renderMajorItem}
                style={styles.bannerWrapper}
            />
        );
    }

    function renderTrip() {
        return (
            <View
                style={{
                    marginTop: MSIZES.padding * 2,
                }}
            >
                <View
                    style={{
                        marginBottom: MSIZES.padding * 2,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={{ ...MFONTS.h3 }}>Trip Summary</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(TRIPLIST_SCREEN)}>
                        <Text style={{ color: MCOLORS.gray, ...MFONTS.body4 }}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: MSIZES.padding }}>
                    <TouchableOpacity onPress={() => navigation.navigate(NEWTRIP_SCREEN)}>
                        {currentTrip && (
                            <TripSummary
                                tripName={currentTrip.tripName}
                                date={currentTrip.date}
                                tag={currentTrip.tag}
                                isRequiredRiskAssessment={currentTrip.isRequiredRiskAssessment}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[
                            styles.tripItemWrapper,
                            styles.tripOptionWrapper,
                            { marginRight: MSIZES.padding },
                        ]}
                        onPress={() => navigation.navigate(ADDEXPENSE_SCREEN)}
                    >
                        <Image source={icons.expenses} />
                        <Text style={{ fontWeight: 'bold' }}>Expenses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tripItemWrapper, styles.tripOptionWrapper]}>
                        <Image style={{ height: 45 }} source={icons.budget} />
                        <Text style={{ fontWeight: 'bold' }}>Budget</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tripItemWrapper,
                            styles.tripOptionWrapper,
                            { marginLeft: MSIZES.padding },
                        ]}
                        onPress={() => navigation.navigate(NOTE_SCREEN)}
                    >
                        <Image source={icons.bublenote} />
                        <Text style={{ fontWeight: 'bold' }}>Note</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderEntries() {
        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderTrip()}
                {renderRecentEntries()}
            </View>
        );

        const renderRecentEntries = () => (
            <View
                style={{
                    flexDirection: 'column',
                    marginVertical: MSIZES.padding * 2,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...MFONTS.h3 }}>Recent Entries</Text>
                </View>
                {!(expenseList.length > 0) && <Text>Not expense founded</Text>}
            </View>
        );

        const renderItem: ListRenderItem<ExpenseType> = ({ item }) => (
            <View style={styles.recentEntriesItemWrapper}>
                <View>
                    <Text style={{ ...MFONTS.h3 }}>{item.type}</Text>
                    <Text>{moment(item.date).format(DisplayFormatDate)}</Text>
                </View>
                <Text style={{ ...MFONTS.h3, color: MCOLORS.emerald }}>${item.amount}</Text>
            </View>
        );

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: MSIZES.padding * 3 }}
                numColumns={1}
                data={expenseList}
                keyExtractor={(_, index) => `_key${index.toString()}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }} />}
            />
        );
    }

    return <Layout>{renderEntries()}</Layout>;
};
const styles = StyleSheet.create({
    recentEntriesItemWrapper: {
        marginVertical: MSIZES.base,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recentEntriesCategoryDot: {
        backgroundColor: MCOLORS.black,
        borderRadius: 4,
        height: 10,
        width: 10,
    },
    recentEntriesCategoryItem: {
        padding: MSIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: MSIZES.padding,
    },
    recentEntriesCategoryText: {
        paddingLeft: 3,
        color: MCOLORS.white,
    },
    headerWrapper: {
        flex: 1,
        marginVertical: MSIZES.padding * 2,
        flexDirection: 'row',
    },
    bannerWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: MSIZES.padding * 1.5,
        backgroundColor: MCOLORS.emerald,
    },
    tripItemWrapper: {
        padding: MSIZES.padding * 1.5,
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
    tripOptionWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default Home;
