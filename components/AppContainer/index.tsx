import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

type AppContainerProps = {
    children: Array<JSX.Element>
}

export const AppContainer = ({ children }: AppContainerProps): JSX.Element => (
    <SafeAreaView style={styles.appContainer}>{children}</SafeAreaView>
)

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'row',
    },
})
