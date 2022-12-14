import React from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native'

import { PlayerModalProps } from './models'

import { COLORS } from '../../../config/styles'

// player modal
export const PlayerModal = ({
    player: { photo, name, position, age, number },
    onRequestClose,
    ...props
}: PlayerModalProps) => {
    return (
        <Modal {...props} onRequestClose={onRequestClose} transparent>
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
                    <Image
                        style={styles.playerThumbnail}
                        source={{ uri: photo }}
                    />

                    <Text style={styles.text}>Name: {name}</Text>
                    <Text style={styles.text}>Position: {position}</Text>
                    <Text style={styles.text}>Number: {number}</Text>
                    <Text style={styles.text}>Age: {age}</Text>
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
    },
    playerThumbnail: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 15,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeIcon: {
        width: 15,
        height: 15,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.black,
    },
})
