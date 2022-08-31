import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'

import { PlayerModalProps } from './models'

export const PlayerModal = ({
    player,
    onRequestClose,
    ...props
}: PlayerModalProps) => {
    return (
        <Modal {...props} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <Text>Hello</Text>
                    <TouchableOpacity onPress={onRequestClose}>
                        <Text>Close</Text>
                    </TouchableOpacity>
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
    },
})
