import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { PlayerCardProps } from './models'

import { useToggle } from '../../hooks/useToggle'

export const PLAYER_CARD_HEIGHT = 150

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
            <Text>{name}</Text>
            <Image style={styles.playerThumbnail} source={{ uri: photo }} />
            <Text>{position}</Text>
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
        height: PLAYER_CARD_HEIGHT,
    },
    playerThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    heartIcon: {
        width: 20,
        height: 20,
    },
})
