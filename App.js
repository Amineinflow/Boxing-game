import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/constants/Colors";
import StartPage from "./src/Screens/StartPage/Start-page";
import BottomNavigator from "./src/Navigations/BottomNavigation";

import { NativeBaseProvider, extendTheme } from "native-base";
import DetailFighter from "./src/Screens/DetailFighter/DetailFighter";

import { FighterProvider } from "./src/context/FichterContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FighterProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StartPage" component={StartPage} />
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="DetailFighter" component={DetailFighter} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </FighterProvider>
  );
}
