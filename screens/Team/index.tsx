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
    Image,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

// components
import { AppContainer } from '../../components/AppContainer'
import { PlayerCard } from '../../components/PlayerCard'

// modals
import { PlayerModal } from '../../components/Modals/PlayerModal'
import { ErrorModal } from '../../components/Modals/ErrorModal'

// model
import { TeamPlayer } from '../../components/PlayerCard/models'

// toggle hook
import { useToggle } from '../../hooks/useToggle'

import { COLORS } from '../../config/styles'

// api config imports
import {
    API_OPTIONS,
    API_ONE,
    API_TWO,
    POSITIONS,
    FALLBACK_API_OPTIONS,
    FALLBACK_API_ONE,
    FALLBACK_API_TWO,
} from '../../config/appConfig'

const screenWidth = Dimensions.get('window').width

// team screen
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
    const [isFallback, toggleIsFallback]: [
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ] = useState(false)
    const [errorModalType, setErrorModalType]: [
        string,
        Dispatch<SetStateAction<string>>,
    ] = useState('')

    const [isPlayerModalVisible, toggleIsPlayerModalVisible] = useToggle()
    const [dropdownIsVisible, toggleDropdownIsVisible] = useToggle()

    // fetch api function with fallback functionality
    const fetchApi = useCallback(
        async (url: string): Promise<void> => {
            try {
                const apiResponse = await fetch(
                    url,
                    !isFallback ? API_OPTIONS : FALLBACK_API_OPTIONS,
                )
                const { response } = await apiResponse.json()
                if (response && response.length === 0) {
                    toggleIsErrorModalVisible(true)
                    setErrorModalType('limit')
                    toggleIsFallback(true)
                } else if (response && response.length > 0) {
                    setTeams((t: any) => [...t, ...response])
                    setTeamsCopy((t: any) => [...t, ...response])
                }
                setIsLoading(false)
            } catch (err) {
                console.error(err)
                toggleIsErrorModalVisible(true)
                setErrorModalType('default')
                toggleIsFallback(true)
            }
        },
        [isFallback],
    )

    // fetch api effect
    useEffect(() => {
        setIsLoading(true)
        setTeams([])
        setTeamsCopy([])
        fetchApi(!isFallback ? API_ONE : FALLBACK_API_ONE)
        fetchApi(!isFallback ? API_TWO : FALLBACK_API_TWO)
    }, [isFallback, fetchApi])

    // handle dropdown filter value change
    const handleChangeValue = useCallback(
        ({ value }: any) => {
            if (value === POSITIONS[0].label) {
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

    // toggle player modal function
    const handleTogglePlayerModal = useCallback(
        (player: TeamPlayer): void => {
            toggleIsPlayerModalVisible()
            setPlayer(player)
        },
        [toggleIsPlayerModalVisible],
    )

    // flatList render item
    const renderItem = useCallback(
        ({ item }: any): JSX.Element => (
            <PlayerCard
                player={item}
                handleTogglePlayerModal={handleTogglePlayerModal}
            />
        ),
        [handleTogglePlayerModal],
    )

    // flatList key extractor
    const keyExtractor = useCallback(({ id }: any): string => id, [])

    // flatList header component
    const FlatListHeader = ({ team: { logo } }: any) => (
        <View style={styles.teamLogoContainer}>
            <Image style={styles.teamLogo} source={{ uri: logo }} />
        </View>
    )

    return (
        <AppContainer>
            <>
                <PlayerModal
                    player={teamPlayer}
                    visible={isPlayerModalVisible}
                    onRequestClose={toggleIsPlayerModalVisible}
                />
                <ErrorModal
                    errorModalType={errorModalType}
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
                        style={styles.dropdownFilter}
                        disableBorderRadius
                    />
                </View>
                {isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={COLORS.black} />
                    </View>
                )}
                {teams.map(({ players, team }, i) => (
                    <View key={i} style={styles.flatListContainer}>
                        <FlatList
                            data={players}
                            renderItem={renderItem}
                            ListHeaderComponent={<FlatListHeader team={team} />}
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
    dropdownFilter: {
        borderColor: COLORS.white,
    },
    teamLogoContainer: {
        alignItems: 'center',
    },
    teamLogo: {
        width: 80,
        height: 80,
    },
    activityIndicator: {
        alignSelf: 'center',
        width: screenWidth,
        justifyContent: 'center',
    },
})
