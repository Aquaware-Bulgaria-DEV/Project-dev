import React from "react";
import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import AntDesignI from "react-native-vector-icons/AntDesign";
import { styles } from "./subcompStyles.js";

import { TipsByCategory } from "./tips.jsx";

const categories = ["МИВКА КУХНЯ", "ПЕРАЛНЯ", "ДУШ БАНЯ", "ТОАЛЕТНА"];

export const List = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const pressHandler = (category) => {
    setSelectedCategory(category);
    //TODO: onPress to scroll to the selected section
    console.log("Selected category:", category);
  };

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>НАЙ-ВИСОКО ПОТРЕБЛЕНИЕ</Text>
      </View>
      <View style={styles.listContainer}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => pressHandler(category)}
            style={styles.item}
          >
            <Text
              style={[
                styles.itemText,
                selectedCategory === category && styles.selectedItemText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.accountContainer}
        onPress={() => console.log("pressed")}
      >
        <View style={styles.account}>
          <AntDesignI name={"user"} size={25} style={styles.userIcon} />
          <View>
            <Text style={styles.accountTitle}>Моят акаунт</Text>
            <Text style={styles.accountSubtitle}>сравни с минали месеци</Text>
          </View>
        </View>
        <AntDesignI name={"arrowright"} size={35} style={styles.arrow} />
      </Pressable>

      <TipsByCategory></TipsByCategory>
    </ScrollView>
  );
};
