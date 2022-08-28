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
    return (
        <View style={{ flexDirection: 'row' }}>
            {teams.map(({ players }) => (
                <FlatList
                    data={players}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    keyExtractor={(item) => item.id}
                />
            ))}
        </View>
    )
}
