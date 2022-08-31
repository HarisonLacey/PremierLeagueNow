import React, {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { AppContainer } from '../../components/AppContainer'
import { PlayerCard } from '../../components/PlayerCard'

import { PlayerModal } from '../../components/Modals/PlayerModal'

import { TeamPlayer } from '../../components/PlayerCard/models'

import { useToggle } from '../../hooks/useToggle'

import { PLAYER_CARD_HEIGHT } from '../../components/PlayerCard'

const POSITIONS = [
    { label: 'All positions', value: 'All positions' },
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Attacker', value: 'Attacker' },
]

const screenWidth = Dimensions.get('window').width

export const TeamScreen = (): JSX.Element => {
    const [teams, setTeams]: [Array<any>, Dispatch<SetStateAction<any>>] =
        useState([])
    const [teamsCopy, setTeamsCopy]: [
        Array<any>,
        Dispatch<SetStateAction<any>>,
    ] = useState([])
    const [teamPlayer, setPlayer]: [any, Dispatch<SetStateAction<any>>] =
        useState(null)
    const [dropdownValue, setDropdownValue]: [
        any,
        Dispatch<SetStateAction<any>>,
    ] = useState(null)
    const [isLoading, setIsLoading]: [
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ] = useState(false)

    const [isVisible, toggleIsVisible] = useToggle()
    const [dropdownIsVisible, toggleDropdownIsVisible] = useToggle()

    const fetchApi = useCallback(async (url: string): Promise<void> => {
        try {
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
            setTeamsCopy((t: any) => [...t, ...response])
            setIsLoading(false)
        } catch (err) {
            console.error(err)
        }
    }, [])

    useEffect(() => {
        if (!teams.length) {
            setIsLoading(true)
            setTeams([])
            setTeamsCopy([])
            fetchApi(
                'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=49',
            )
            fetchApi(
                'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=42',
            )
        }
    }, [teams, fetchApi])

    // handle dropdown filter value change
    const handleChangeValue = useCallback(
        ({ value }: any) => {
            if (value === 'All positions') {
                setTeams(teamsCopy)
            } else {
                const teamPositionFilter = teamsCopy.reduce(
                    (acc, { players, team }) => {
                        const newPlayers = players.reduce(
                            (a: Array<TeamPlayer>, c: TeamPlayer) => {
                                c.position === value && a.push(c)

                                return a
                            },
                            [],
                        )
                        acc.push({ players: newPlayers, team })
                        return acc
                    },
                    [],
                )
                setTeams(teamPositionFilter)
            }
        },
        [teamsCopy],
    )

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

    return (
        <AppContainer>
            <>
                <PlayerModal
                    player={teamPlayer}
                    visible={isVisible}
                    onRequestClose={toggleIsVisible}
                />
                <View style={styles.dropdownFilterContainer}>
                    <DropDownPicker
                        open={dropdownIsVisible}
                        value={dropdownValue}
                        items={POSITIONS}
                        setOpen={toggleDropdownIsVisible}
                        setValue={setDropdownValue}
                        onSelectItem={handleChangeValue}
                        placeholder="All positions"
                    />
                </View>
                {isLoading && <ActivityIndicator size="large" />}
                {teams.map(({ players }, i) => (
                    <View key={i} style={styles.flatListContainer}>
                        <FlatList
                            data={players}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
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
        paddingTop: 80,
        paddingHorizontal: 5,
    },
    dropdownFilterContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 10,
        width: '100%',
        backgroundColor: '#fff',
    },
})
