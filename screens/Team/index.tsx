import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { View, Text, FlatList } from 'react-native'

import { AppContainer } from '../../components/AppContainer'

export const TeamScreen = (): JSX.Element => {
    const [teams, setTeams]: [Array<any>, Dispatch<SetStateAction<any>>] =
        useState([])
    const fetchApi = useCallback(async (url: string): Promise<void> => {
        try {
            const apiResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': '0c9663882ca2a28ea82d9427f6d3dc1a',
                },
            })
            const { response } = await apiResponse.json()
            setTeams((t: any) => [...t, ...response])
        } catch (err) {
            console.error(err)
        }
    }, [])

    useEffect(() => {
        if (!teams.length) {
            fetchApi('https://v3.football.api-sports.io/players/squads?team=49')
            fetchApi('https://v3.football.api-sports.io/players/squads?team=42')
        }
    }, [teams, fetchApi])

    const renderItem = useCallback(
        ({ item: { name } }: any): JSX.Element => (
            <View>
                <Text>{name}</Text>
            </View>
        ),
        [],
    )

    const keyExtractor = useCallback(({ id }: any): string => id, [])

    return (
        <AppContainer>
            {teams.map(({ players }, i) => (
                <FlatList
                    key={i}
                    data={players}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            ))}
        </AppContainer>
    )
}
