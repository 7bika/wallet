import React from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import SearchScreen from "./../screens/home/SearchScreen"

const Stack = createSharedElementStackNavigator()

const SearchNavigator = () => {
  return (
    <Stack.Navigator independent>
      <Stack.Screen
        independent={true}
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          useNativeDriver: true,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default SearchNavigator
