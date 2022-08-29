import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// screens
import { TeamScreen } from '../screens/Team'

// stack param list
type RootStackParamList = {
    Team: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// app navigator component
export const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Team">
            <Stack.Screen name="Team" component={TeamScreen} options={{}} />
        </Stack.Navigator>
    </NavigationContainer>
)
