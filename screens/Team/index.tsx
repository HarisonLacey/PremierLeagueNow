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
import { ErrorModal } from '../../components/Modals/ErrorModal'

import { TeamPlayer } from '../../components/PlayerCard/models'

import { useToggle } from '../../hooks/useToggle'

import { COLORS } from '../../config/styles'

import {
    API_OPTIONS,
    API_ONE,
    API_TWO,
    POSITIONS,
} from '../../config/appConfig'

const screenWidth = Dimensions.get('window').width

export const TeamScreen = (): JSX.Element => {
    const [teams, setTeams]: [Array<any>, Dispatch<SetStateAction<any>>] =
        useState([])
    const [teamsCopy, setTeamsCopy]: [
        Array<any>,
        Dispatch<SetStateAction<any>>,
    ] = useState([])
    const [teamPlayer, setPlayer]: [any, Dispatch<SetStateAction<any>>] =
        useState({})
    const [dropdownValue, setDropdownValue]: [
        any,
        Dispatch<SetStateAction<any>>,
    ] = useState(null)
    const [isLoading, setIsLoading]: [
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ] = useState(false)
    const [isErrorModalVisible, toggleIsErrorModalVisible]: [
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ] = useState(false)
    const [errorDescription, setErrorDescription]: [
        string,
        Dispatch<SetStateAction<string>>,
    ] = useState('')

    const [isPlayerModalVisible, toggleIsPlayerModalVisible] = useToggle()
    const [dropdownIsVisible, toggleDropdownIsVisible] = useToggle()

    const fetchApi = useCallback(
        async (url: string): Promise<void> => {
            try {
                const apiResponse = await fetch(url, API_OPTIONS)
                const { response } = await apiResponse.json()
                if (response.length === 0 && !isErrorModalVisible) {
                    toggleIsErrorModalVisible(true)
                    setErrorDescription(
                        'API limit reached. Please update API key in App config file.',
                    )
                } else {
                    setTeams((t: any) => [...t, ...response])
                    setTeamsCopy((t: any) => [...t, ...response])
                }
                setIsLoading(false)
            } catch (err) {
                console.error(err)
                if (!isErrorModalVisible) {
                    toggleIsErrorModalVisible(true)
                    setErrorDescription('API call error')
                }
            }
        },
        [isErrorModalVisible],
    )

    useEffect(() => {
        setIsLoading(true)
        setTeams([])
        setTeamsCopy([])
        fetchApi(API_ONE)
        fetchApi(API_TWO)
    }, [fetchApi])

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
            toggleIsPlayerModalVisible()
            setPlayer(player)
        },
        [toggleIsPlayerModalVisible],
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
                    visible={isPlayerModalVisible}
                    onRequestClose={toggleIsPlayerModalVisible}
                />
                <ErrorModal
                    description={errorDescription}
                    visible={isErrorModalVisible}
                    onRequestClose={toggleIsErrorModalVisible}
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
        backgroundColor: COLORS.white,
    },
})
