import * as React from "react"
import { useContext, useEffect } from "react"
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native"
import { Spinner } from "native-base"
const { width } = Dimensions.get("screen")
import { EvilIcons } from "@expo/vector-icons"
import {
  FlingGestureHandler,
  Directions,
  State,
  TouchableHighlight,
} from "react-native-gesture-handler"

import FighterContext from "../../context/FichterContext"

const OVERFLOW_HEIGHT = 70
const SPACING = 10
const ITEM_WIDTH = width * 0.76
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEMS = 3
1

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1]
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.fullName}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.country}
                </Text>
                <Text style={[styles.date]}>{item.record}</Text>
              </View>
            </View>
          )
        })}
      </Animated.View>
    </View>
  )
}

function HomePage() {
  const { getFighters, Fighters } = useContext(FighterContext)
  const [data, setData] = React.useState([])

  useEffect(() => {
    setTimeout(() => {
      getFighters()
    }, 1000)
  }, [])

  useEffect(() => {
    setData(Fighters)
  }, [Fighters])

  // const [Loading,setLoading] = React.useState(true)
  const scrollXIndex = React.useRef(new Animated.Value(0)).current
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current
  const [index, setIndex] = React.useState(0)
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex)
    setIndex(activeIndex)
  })

  React.useEffect(() => {
    if (data.length > 0) {
      if (index === data.length - VISIBLE_ITEMS - 1) {
        const newData = [...data, ...data]
        setData(newData)
      }
    }
  })

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start()
  })

  if (data.length == 0) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size="lg" color={"warning.600"} />
      </View>
    )
  } else {
    return (
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return
            }
            setActiveIndex(index + 1)
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return
              }
              setActiveIndex(index - 1)
            }
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />

            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: SPACING * 2,
                marginTop: 30,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, { zIndex: data.length - index }]
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                )
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1]
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                })
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                })
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                })

                return (
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    {item.picture ? (
                      <Image
                        source={{ uri: item.picture }}
                        style={{
                          width: ITEM_WIDTH,
                          height: ITEM_HEIGHT,
                          borderRadius: 14,
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: "https://banner2.cleanpng.com/20190707/ris/kisspng-kickboxing-muay-thai-stock-photography-image-spora-club-grup-dersleri-5d2299c0a0a063.5994271815625486726579.jpg",
                        }}
                        style={{
                          width: ITEM_WIDTH,
                          height: ITEM_HEIGHT,
                          borderRadius: 14,
                        }}
                      />
                    )}
                  </Animated.View>
                )
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    )
  }
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
})
