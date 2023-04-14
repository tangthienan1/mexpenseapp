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
    icons,
    MCOLORS,
    MFONTS,
    MSIZES,
    NOTE_SCREEN,
    TRIPLIST_SCREEN,
} from '../../consts';
import { HomeEntriesItemProps, TripType } from '../../type/type';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { NEWTRIP_SCREEN } from '../../consts/screenName';

type RouteParamProps = {
    trip: TripType;
};

type HomeRouteProp = RouteProp<ParamListBase> & {
    params: RouteParamProps;
};

type HomeScreenProps = {
    navigation: any;
};

const Home: FC<HomeScreenProps> = ({ navigation }) => {
    const route = useRoute<HomeRouteProp>();
    const tripData = route?.params?.trip;
    const expenses = [
        {
            type: 'Move',
            amount: 300,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Food',
            amount: 300,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Hotel',
            amount: 200,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Taxi',
            amount: 100,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Move',
            amount: 600,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Food',
            amount: 400,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Hotel',
            amount: 100,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Taxi',
            amount: 700,
            date: 'Sun 30 Oct',
        },
        {
            type: 'TestHigh',
            amount: 800,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Food',
            amount: 400,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Hotel',
            amount: 100,
            date: 'Sun 30 Oct',
        },
        {
            type: 'Taxi',
            amount: 700,
            date: 'Sun 30 Oct',
        },
    ];

    const [expenseList, setExpenseList] = useState<HomeEntriesItemProps[] | undefined>();
    const [totalExpense, setTotalExpense] = useState<number>();
    useEffect(() => {
        const expenseSum = expenses.reduce((accumulator, expense) => {
            return accumulator + expense.amount;
        }, 0);
        setTotalExpense(expenseSum);
        setExpenseList(expenses);
    }, []);

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

    function renderBanner(total: number) {
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
                        <Text style={{ ...MFONTS.h4 }}>$ {total}</Text>
                    </View>
                    <Text style={{ ...MFONTS.body2 }}>Top expenses</Text>
                </View>
            );
        };

        const renderMajorItem: ListRenderItem<HomeEntriesItemProps> = ({ item }) => (
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NEWTRIP_SCREEN, { tripData })}
                    >
                        <TripSummary
                            tripName={tripData.tripName}
                            date={tripData.date}
                            tag={tripData.tag}
                            isRequiredRiskAssessment={tripData.isRequiredRiskAssessment}
                        />
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
                {totalExpense && renderBanner(totalExpense)}
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
            </View>
        );

        const renderItem: ListRenderItem<HomeEntriesItemProps> = ({ item }) => (
            <View style={styles.recentEntriesItemWrapper}>
                <View>
                    <Text style={{ ...MFONTS.h3 }}>{item.type}</Text>
                    <Text>{item.date}</Text>
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
                keyExtractor={(item, index) => `_key${index.toString()}`}
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
