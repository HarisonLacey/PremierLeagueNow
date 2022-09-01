import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import { AppContainerProps } from './models'

// app container
export const AppContainer = ({ children }: AppContainerProps): JSX.Element => (
    <SafeAreaView style={styles.appContainer}>{children}</SafeAreaView>
)

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'row',
    },
})
