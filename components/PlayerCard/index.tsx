import React from 'react'
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native'

import { PlayerCardProps } from './models'

import { useToggle } from '../../hooks/useToggle'

const screenWidth = Dimensions.get('window').width

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
        borderColor: '#808080',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        width: (screenWidth / 2) * 0.9,
    },
    playerThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 5,
    },
    heartIcon: {
        width: 25,
        height: 25,
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
    },
    name: {
        fontSize: 15,
    },
})
