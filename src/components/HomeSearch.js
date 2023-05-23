import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import fighters from "../hooks/data";
import COLORS from "../constants/Colors";
import FighterContext from "../context/FichterContext";

import {
  FlingGestureHandler,
  Directions,
  State,
  TouchableHighlight,
} from "react-native-gesture-handler";

const HomeSearch = ({ navigation }) => {
  const { Fighters } = useContext(FighterContext);
  const [list, setList] = useState(Fighters);
  const [search, setSearch] = useState(null);

  const filterList = (item) => {
    const newList = Fighters.filter(
      (val) =>
        val.fullName.toLowerCase().includes(search)
    );
    setList(newList);
  };

  useEffect(() => {
    if (search !== null) {
      filterList(Fighters);
    }
  }, [search]);

  return (
    <View>
      <View style={styles.search}>
        <View style={styles.icon}>
          <Icon name="search" size={20} color={COLORS.white} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(val) => setSearch(val)}
        />
      </View>

      <View>
        <FlatList
          data={list}
          key={({ item }) => item.value}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <TouchableHighlight
                  underlayColor={"white"}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate("DetailFighter", item)}
                >
                  <Text style={styles.listText}>{item.fullName}</Text>
                </TouchableHighlight>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  search: {
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  icon: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#F3F0F0",
    padding: 10,
    borderRadius: 5,
  },
  listText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
