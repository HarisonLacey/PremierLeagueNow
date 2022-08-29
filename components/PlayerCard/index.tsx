import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

type PlayerCardProps = {
    player: {
        id?: number
        name: string
        age: number
        number: number
        position: string
        photo: string
    }
}

export const PlayerCard = ({
    player: { name, age, number, position, photo },
}: PlayerCardProps): JSX.Element => {
    return (
        <TouchableOpacity style={styles.playerCardContainer}>
            <Text>{name}</Text>
            <Image style={styles.playerThumbnail} source={{ uri: photo }} />
            <Text>{position}</Text>
            <Text>{age}</Text>
            <Text>{number}</Text>
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
