import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// stack param list
type RootStackParamList = {
    Landing: undefined
    Team: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// app navigator component
export const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Landing" component={} options={{}} />
            <Stack.Screen name="Team" component={} options={{}} />
        </Stack.Navigator>
    </NavigationContainer>
)
