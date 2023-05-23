import React from "react"
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/MaterialIcons"
import COLORS from "../../constants/Colors"
import { EvilIcons } from "@expo/vector-icons"

const DetailFighter = ({ navigation, route }) => {
  const item = route.params

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 500,
          }}
        >
          {item.picture ? (
            <Image
              source={{
                uri: item.picture,
              }}
              style={{ height: 520, width: 420 }}
            />
          ) : (
            <Image
              source={{
                uri: "https://banner2.cleanpng.com/20190707/ris/kisspng-kickboxing-muay-thai-stock-photography-image-spora-club-grup-dersleri-5d2299c0a0a063.5994271815625486726579.jpg",
              }}
              style={{ height: 520, width: 420 }}
            />
          )}
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
            >
              {item.fullName}
            </Text>
            <View>
              <Text>
                <EvilIcons
                  name="location"
                  size={16}
                  color="black"
                  style={{ marginRight: 5 }}
                />
                {item.country}
              </Text>
              <Text>{item.record}</Text>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
})

export default DetailFighter
