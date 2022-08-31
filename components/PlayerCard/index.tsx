import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { PlayerCardProps } from './models'

import { useToggle } from '../../hooks/useToggle'

export const PLAYER_CARD_HEIGHT = 300

export const PlayerCard = ({
    player,
    player: { name, position, photo },
    handleTogglePlayerModal,
}: PlayerCardProps): JSX.Element => {
    const [isLiked, toggleIsLiked] = useToggle()
    return (
        <TouchableOpacity
            style={styles.playerCardContainer}
            onPress={handleTogglePlayerModal.bind(this, player)}
        >
            <Text style={[styles.text, styles.name]}>{name}</Text>
            <Image style={styles.playerThumbnail} source={{ uri: photo }} />
            <Text style={styles.text}>{position}</Text>
            {!isLiked ? (
                <TouchableOpacity onPress={toggleIsLiked}>
                    <Image
                        style={styles.heartIcon}
                        source={require('../../assets/like.png')}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={toggleIsLiked}>
                    <Image
                        style={styles.heartIcon}
                        source={require('../../assets/liked.png')}
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    playerCardContainer: {
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    playerThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 5,
    },
    heartIcon: {
        width: 20,
        height: 20,
        marginVertical: 5,
    },
    text: {
        fontWeight: 'bold',
    },
    name: {
        fontSize: 15,
    },
})
