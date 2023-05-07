import { API, Hub, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeleteTripInput, Trip } from '../../API';
import { MCOLORS, MFONTS, MSIZES, TRIPLIST_SCREEN, TRIP_CHANNEL, icons, theme } from '../../consts';
import { DisplayFormatDate } from '../../consts/common';
import { deleteTrip } from '../../graphql/mutations';
import { IsRequiredRiskAssessmentModal } from '../../modal';
import Tag from '../Tag';
import { DeleteTripBtn } from './TripSummary.style';

type TripSummaryProps = {
    trip: Trip;
    isDeleteAble?: boolean;
};

const TripSummary: FC<TripSummaryProps> = ({ trip, isDeleteAble = false }) => {
    const { id: tripId, tripName, date, tag, isRequiredRiskAssessment, _version } = trip;
    const [isShowRequiredAssessmentModal, setIsShowRequiredAssessmentModal] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDeleteTrip = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            Hub.dispatch(TRIP_CHANNEL, {
                event: 'deleteTrip',
            });

            console.log('trippp', { trip });
            const deleteTripInput: DeleteTripInput = {
                id: tripId,
                _version,
            };

            const res = await API.graphql(
                graphqlOperation(deleteTrip, { input: deleteTripInput })
            );

            console.log('testt', { res });
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

    return (
        <View style={styles.tripItemWrapper}>
            {isDeleteAble && (
                <DeleteTripBtn
                    icon="close"
                    iconColor={theme.MCOLORS.red}
                    onPress={() => onDeleteTrip()}
                />
            )}
            <IsRequiredRiskAssessmentModal
                isShowRequiredAssessmentModal={isShowRequiredAssessmentModal}
                onRequestClose={() => setIsShowRequiredAssessmentModal(false)}
            />
            <Text style={{ ...MFONTS.body2, marginBottom: MSIZES.padding }}>{tripName}</Text>
            <View style={styles.contentWrapper}>
                <Text style={styles.date}>Date: {moment(date).format(DisplayFormatDate)}</Text>
                <Tag tag={tag} />
            </View>
            {isRequiredRiskAssessment && (
                <TouchableOpacity
                    style={styles.requiredRiskAssessment}
                    onPress={() => setIsShowRequiredAssessmentModal(true)}
                >
                    <Image source={icons.requiredassesment} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TripSummary;

const styles = StyleSheet.create({
    deleteTripBtn: {
        position: 'absolute',
        top: 0,
        left: 0,

        width: 10,
        height: 10,
        backgroundColor: 'red',
    },
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
    date: {
        fontWeight: 'bold',
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    requiredRiskAssessment: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: MCOLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: MCOLORS.blue,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
