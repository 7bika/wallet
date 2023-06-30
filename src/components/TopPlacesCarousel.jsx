import React from "react"
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import { colors, shadow, sizes, spacing } from "../constants/theme"
import FavoriteButton from "./shared/FavoriteButton"
import { useNavigation } from "@react-navigation/native"
import { SharedElement } from "react-native-shared-element"

import Carousel from "./../components/shared/Carousel"
import Card from "./../components/shared/Card/Card"
import CardMedia from "./../components/shared/Card/CardMedia"
import CardFavoriteIcon from "./../components/shared/Card/CardFavoriteIcon"

const CARD_WIDTH = sizes.width - 80
const CARD_HEIGHT = 200

const TopPlacesCarousel = ({ list }) => {
  const navigation = useNavigation()
  return (
    <Carousel
      items={list}
      renderItem={({ item, style }) => {
        return (
          <Card
            style={[styles.card, style]}
            shadowType="dark"
            onPress={() => {
              navigation.navigate("TourDetails", { trip: item })
            }}
          >
            <CardFavoriteIcon
              active={false}
              onPress={() => {
                alert("added to favorite")
              }}
            />
            <SharedElement
              id={`trip.${item.id}.image`}
              style={StyleSheet.absoluteFillObject}
            >
              <CardMedia source={item.image} borderBottomRadius />
            </SharedElement>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </Card>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: "absolute",
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: "bold",
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
})

export default TopPlacesCarousel
