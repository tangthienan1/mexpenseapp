import React, { FC } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MCOLORS } from '../../consts';

type IsRequiredRiskAssessmentType = {
    isShowRequiredAssessmentModal: boolean;
    onRequestClose: () => void;
};

const IsRequiredRiskAssessmentModal: FC<IsRequiredRiskAssessmentType> = ({
    isShowRequiredAssessmentModal,
    onRequestClose,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowRequiredAssessmentModal}
            onRequestClose={onRequestClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Required Risk Assessment</Text>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={onRequestClose}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default IsRequiredRiskAssessmentModal;

const styles = StyleSheet.create({
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
