import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import { AppContainer } from '../../components/AppContainer'

import { useToggle } from '../../hooks/useToggle'

export const TeamScreen = (): JSX.Element => {
    const [teams, setTeams]: [Array<any>, Dispatch<SetStateAction<any>>] =
        useState([])
    const [isLoading, setIsLoading] = useToggle()
    const fetchApi = useCallback(
        async (url: string): Promise<void> => {
            try {
                setIsLoading()
                const apiResponse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key':
                            '19bf388045msh417cd2e0d111ee8p1eec85jsnc46e0facaf9a',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                    },
                })
                const { response } = await apiResponse.json()
                setTeams((t: any) => [...t, ...response])
                setIsLoading()
            } catch (err) {
                console.error(err)
            }
        },
        [setIsLoading],
    )

    useEffect(() => {
        setTeams([])
        fetchApi(
            'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=49',
        )
        fetchApi(
            'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=42',
        )
    }, [fetchApi])

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
            {isLoading && <ActivityIndicator />}
            {!isLoading &&
                teams.map(({ players }) => (
                    <FlatList
                        data={players}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                    />
                ))}
        </AppContainer>
    )
}
