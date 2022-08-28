import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// screens
import { TeamScreen } from '../screens/Team'
import { PlayerScreen } from '../screens/Player'

// stack param list
type RootStackParamList = {
    Team: undefined
    Player: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// app navigator component
export const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Team"
            screenOptions={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Team" component={TeamScreen} options={{}} />
            <Stack.Screen name="Player" component={PlayerScreen} options={{}} />
        </Stack.Navigator>
    </NavigationContainer>
)
