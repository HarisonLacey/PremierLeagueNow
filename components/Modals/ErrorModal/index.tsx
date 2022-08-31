import React from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native'

import { ErrorModalProps } from './models'

export const ErrorModal = ({
    description,
    onRequestClose,
    ...props
}: ErrorModalProps) => {
    return (
        <Modal {...props} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onRequestClose}
                    >
                        <Image
                            style={styles.closeIcon}
                            source={require('../../../assets/close.png')}
                        />
                    </TouchableOpacity>
                    <Image source={require('../../../assets/close.png')} />

                    <Text style={styles.text}>An error occurred!</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 50,
        flex: 1,
        justifyContent: 'center',
    },
    modalContentContainer: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeIcon: {
        width: 15,
        height: 15,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
})
