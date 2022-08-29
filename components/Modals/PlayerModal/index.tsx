import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'

import { TeamPlayer } from '../../PlayerCard'

type PlayerModalProps = {
    player: TeamPlayer
    visible: boolean
    onRequestClose: () => void
}

export const PlayerModal = ({
    player,
    onRequestClose,
    ...props
}: PlayerModalProps) => {
    return (
        <Modal {...props}>
            <View>
                <Text>Hello</Text>
                <TouchableOpacity onPress={onRequestClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
