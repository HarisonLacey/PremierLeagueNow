import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { View, Text, FlatList } from 'react-native'

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
        setTeams([])
        fetchApi('https://v3.football.api-sports.io/players/squads?team=49')
        fetchApi('https://v3.football.api-sports.io/players/squads?team=42')
    }, [fetchApi])

    const renderItem = useCallback(({ item: { name } }: any): JSX.Element => {
        return (
            <View>
                <Text>{name}</Text>
            </View>
        )
    }, [])

    const keyExtractor = useCallback(({ id }: any): string => id, [])

    const getItemLayout = useCallback(
        (data: any, index: number): any => ({
            length: 10,
            offset: 10 * index,
            index,
        }),
        [],
    )

    return (
        <View style={{ flexDirection: 'row' }}>
            {teams.map(({ players }) => (
                <FlatList
                    data={players}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    getItemLayout={getItemLayout}
                />
            ))}
        </View>
    )
}
