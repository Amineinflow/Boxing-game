import React from "react"
import { Text, StyleSheet, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import COLORS from "../../constants/Colors"
import { PrimaryButton } from "../../components/Button"

function StartPage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ height: 400 }}>
        <Image
          style={{
            width: "100%",
            resizeMode: "contain",
            top: 50,
            backgroundColor: "white",
          }}
          source={require("../../assets/images/image8.jpeg")}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text
            style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}
          >
            The Best Boxers in the World
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: "center",
              color: COLORS.grey,
            }}
          >
            Welcome
          </Text>
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate("Home")}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  )
}

export default StartPage

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
})
