import React from 'react'
import { View, Text } from 'react-native'

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
    player: { name, age, number, position },
}: PlayerCardProps): JSX.Element => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{position}</Text>
            <Text>{age}</Text>
            <Text>{number}</Text>
        </View>
    )
}
