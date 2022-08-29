import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { AppContainer } from '../../components/AppContainer'
import { PlayerCard } from '../../components/PlayerCard'

import { PlayerModal } from '../../components/Modals/PlayerModal'

import { TeamPlayer } from '../../components/PlayerCard/models'

import { useToggle } from '../../hooks/useToggle'

import { PLAYER_CARD_HEIGHT } from '../../components/PlayerCard'

const POSITIONS = [
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Attacker', value: 'Attacker' },
]

const screenWidth = Dimensions.get('window').width

export const TeamScreen = (): JSX.Element => {
    const [teams, setTeams]: [Array<any>, Dispatch<SetStateAction<any>>] =
        useState([])
    const [teamPlayer, setPlayer]: [any, Dispatch<SetStateAction<any>>] =
        useState(null)
    const [dropdownValue, setDropdownValue]: [
        any,
        Dispatch<SetStateAction<any>>,
    ] = useState(null)

    const [isVisible, toggleIsVisible] = useToggle()
    const [dropdownIsVisible, toggleDropdownIsVisible] = useToggle()

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

    const handleTogglePlayerModal = useCallback(
        (player: TeamPlayer): void => {
            toggleIsVisible()
            setPlayer(player)
        },
        [toggleIsVisible],
    )

    const renderItem = useCallback(
        ({ item }: any): JSX.Element => (
            <PlayerCard
                player={item}
                handleTogglePlayerModal={handleTogglePlayerModal}
            />
        ),
        [handleTogglePlayerModal],
    )

    const keyExtractor = useCallback(({ id }: any): string => id, [])

    const getItemLayout = (data: any, index: number) => ({
        length: PLAYER_CARD_HEIGHT,
        offset: PLAYER_CARD_HEIGHT * index,
        index,
    })

    return (
        <AppContainer>
            <>
                <PlayerModal
                    player={teamPlayer}
                    visible={isVisible}
                    onRequestClose={toggleIsVisible}
                />
                <View>
                    <DropDownPicker
                        open={dropdownIsVisible}
                        value={dropdownValue}
                        items={POSITIONS}
                        setOpen={toggleDropdownIsVisible}
                        setValue={setDropdownValue}
                    />
                </View>
                {teams.map(({ players }, i) => (
                    <View key={i} style={styles.flatListContainer}>
                        <FlatList
                            data={players}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            getItemLayout={getItemLayout}
                            extraData={teams}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                ))}
            </>
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
