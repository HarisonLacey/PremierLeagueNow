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

import { COLORS } from '../../config/styles'

const screenWidth = Dimensions.get('window').width

// player card
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
                <TouchableOpacity
                    style={styles.heartIconContainer}
                    onPress={toggleIsLiked}
                >
                    <Image
                        style={styles.heartIcon}
                        source={require('../../assets/like.png')}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.heartIconContainer}
                    onPress={toggleIsLiked}
                >
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
        borderColor: COLORS.playerCardBorder,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        width: (screenWidth / 2) * 0.9,
    },
    playerThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 5,
    },
    heartIconContainer: {
        padding: 10,
    },
    heartIcon: {
        width: 25,
        height: 25,
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        color: COLORS.black,
    },
    name: {
        fontSize: 15,
    },
})
