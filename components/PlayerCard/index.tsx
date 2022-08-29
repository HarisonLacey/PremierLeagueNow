import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export type Player = {
    id: number
    name: string
    age: number
    number: number
    position: string
    photo: string
}

export type PlayerCardProps = {
    player: Player
    handleTogglePlayerModal: (player: Player) => void
}

export const PlayerCard = ({
    player,
    player: { name, position, photo },
    handleTogglePlayerModal,
}: PlayerCardProps): JSX.Element => {
    return (
        <TouchableOpacity
            style={styles.playerCardContainer}
            onPress={handleTogglePlayerModal.bind(this, player)}
        >
            <Text>{name}</Text>
            <Image style={styles.playerThumbnail} source={{ uri: photo }} />
            <Text>{position}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    playerCardContainer: {
        alignItems: 'center',
    },
    playerThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
})
