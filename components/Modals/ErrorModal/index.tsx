import React, { useEffect } from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native'

import { ErrorModalProps } from './models'

import { COLORS } from '../../../config/styles'

// error modal
export const ErrorModal = ({ onRequestClose, visible }: ErrorModalProps) => {
    useEffect(() => {
        visible && setTimeout(() => onRequestClose(false), 4000)
    }, [visible, onRequestClose])
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose.bind(this, false)}
            transparent
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onRequestClose.bind(this, false)}
                    >
                        <Image
                            style={styles.closeIcon}
                            source={require('../../../assets/close.png')}
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.errorIcon}
                        source={require('../../../assets/error.png')}
                    />
                    <Text style={styles.text}>API error occurred</Text>
                    <Text style={styles.description}>
                        Reverting to fallback API.
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: COLORS.modalBackground,
        padding: 50,
        flex: 1,
        justifyContent: 'center',
    },
    modalContentContainer: {
        backgroundColor: COLORS.white,
        flex: 0.5,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeIcon: {
        width: 15,
        height: 15,
    },
    errorIcon: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginVertical: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        color: COLORS.black,
    },
    description: {
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10,
        color: COLORS.black,
    },
})
