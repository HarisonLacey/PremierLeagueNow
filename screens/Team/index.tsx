import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { FlatList, StyleSheet, SafeAreaView, Dimensions } from 'react-native'

import { AppContainer } from '../../components/AppContainer'
import { PlayerCard } from '../../components/PlayerCard'

const screenWidth = Dimensions.get('window').width

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
        ({ item }: any): JSX.Element => <PlayerCard player={item} />,
        [],
    )

    const keyExtractor = useCallback(({ id }: any): string => id, [])

    return (
        <AppContainer>
            {teams.map(({ players }, i) => (
                <SafeAreaView key={i} style={styles.flatListContainer}>
                    <FlatList
                        data={players}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        extraData={teams}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            ))}
        </AppContainer>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        width: screenWidth / 2,
        alignItems: 'center',
        borderWidth: 2,
    },
})
