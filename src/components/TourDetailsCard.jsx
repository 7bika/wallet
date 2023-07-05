import React, { useMemo, useRef, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native"
import { colors, sizes, spacing } from "./../constants/theme"
import * as Animatable from "react-native-animatable"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import MapView, { Marker } from "react-native-maps"

import { Feather } from "@expo/vector-icons"
import { Rating } from "react-native-ratings"

import CustomHandler from "./../components/custom/CustomHandler"
import CustomBackground from "./../components/custom/CustomBackground"
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import Icon from "./../components/icon"
import Divider from "./../components/shared/Divider"
import SectionHeader from "./../components/shared/SectionHeader"
import RatingOverall from "./shared/Rating/RatingOverall"
import HotelsCarousel from "./TourDetailsCard/HotelsCarousel"
import Reviews from "./Reviews/Reviews"

const AnimatedDivider = Animated.createAnimatedComponent(Divider)

const TourDetailsCard = ({ trip }) => {
  const bottomSheetRef = useRef(null)
  const [isMapViewVisible, setIsMapViewVisible] = useState(false)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState(trip.reviews)
  const [rating, setRating] = useState(0)
  const [region, setRegion] = useState(null)
  const mapViewRef = useRef(null)

  const animatedIndex = useSharedValue(0)
  const snapPoints = useMemo(() => ["30%", "80%"], [])
  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.primary]
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 10],
      Extrapolation.CLAMP
    ),
  }))
  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.lightGray]
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [sizes.title, sizes.body],
      Extrapolation.CLAMP
    ),
  }))

  const locationIonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }))

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }))

  const onRegionChange = (changedRegion) => {
    setRegion(changedRegion)
  }

  const handleMapViewPress = () => {
    setIsMapViewVisible(true)
  }

  const handleMapViewClose = () => {
    setIsMapViewVisible(false)
  }

  const handleAddReview = () => {
    if (rating === 0 || review === "") {
      return // Don't add the review if rating or review text is empty
    }

    const newReview = {
      rating,
      review,
    }

    setReviews([...reviews, newReview])
    setRating(0)
    setReview("")
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}
    >
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}
      >
        <Animated.Text style={[styles.title, titleStyle]}>
          {trip.title}
        </Animated.Text>
        <View style={styles.location}>
          <Animated.Text style={[styles.locationText, locationStyle]}>
            {trip.location}
          </Animated.Text>
          <Animated.View style={locationIonStyle}>
            <Icon icon="Location" size={20} style={styles.locationIcon} />
          </Animated.View>
        </View>
      </Animatable.View>
      <AnimatedDivider style={contentStyle} />
      <BottomSheetScrollView
        style={styles.scrollBox}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Animated.View style={contentStyle}>
          <RatingOverall rating={trip.rating} containerStyle={styles.rating} />
          <SectionHeader
            title="Summary"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>{trip.description}</Text>
          </View>
          <SectionHeader
            title="Restaurants"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
            onPress={() => {}}
            buttonTitle="See All"
          />
          <HotelsCarousel hotels={trip.hotels} />
          <SectionHeader
            title="Reviews"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
            onPress={() => {}}
            buttonTitle="See All"
          />
          <Reviews reviews={trip.reviews} />
          <Divider />
          <View style={styles.addReviewContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Rating:</Text>
              <Rating
                showRating
                type="star"
                fractions={1}
                startingValue={rating}
                imageSize={30}
                onFinishRating={(value) => setRating(value)}
                style={styles.ratingStars}
              />
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewLabel}>Review:</Text>
              <TextInput
                style={styles.reviewInput}
                multiline
                placeholder="Write your review here"
                value={review}
                onChangeText={(text) => setReview(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddReview}
            >
              <Text style={styles.addButtonLabel}>Add Review</Text>
            </TouchableOpacity>
          </View>
          <Divider style={{ top: 5 }} />

          <Text style={styles.reviewLabelLocation}> Location:</Text>
          <TouchableOpacity
            style={styles.mapViewButton}
            onPress={handleMapViewPress}
          >
            <Text style={{ color: "white" }}>Map</Text>
            <Feather name="map" size={24} color="white" />
          </TouchableOpacity>

          <Modal visible={isMapViewVisible} animationType="slide">
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleMapViewClose}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <MapView
              ref={mapViewRef}
              style={styles.mapView}
              region={{
                latitude: 51.5078788,
                longitude: -0.0877321,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }}
              />
            </MapView>
          </Modal>
          <Divider style={{ top: 5 }} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now 🔖 </Text>
          </TouchableOpacity>
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    borderWidth: 1,
    borderColor: colors.black,
  },
  map: {
    flex: 1,
  },
  header: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: "bold",
    color: colors.white,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  locationText: {
    fontSize: sizes.title,
    color: colors.white,
  },
  locationIcon: {
    tintColor: colors.gray,
  },
  scrollBox: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  sectionHeader: {
    marginTop: spacing.m,
  },
  sectionTitle: {
    color: colors.lightGray,
    fontWeight: "normal",
  },
  summary: {
    marginHorizontal: spacing.l,
  },
  summaryText: {
    color: colors.primary,
  },
  rating: {
    marginHorizontal: spacing.l,
  },
  button: {
    top: 15,
    borderRadius: 10,
    color: colors.primary,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.m,
    backgroundColor: colors.primary,
    marginLeft: 20,
    marginRight: 20,
  },
  expandedButton: {
    marginBottom: spacing.l,
  },
  buttonText: {
    color: colors.white,
    fontSize: sizes.body,
    marginRight: spacing.s,
  },
  mapViewButton: {
    marginTop: spacing.m,
    marginBottom: spacing.s,
    marginHorizontal: spacing.l,
    borderRadius: 10,
    backgroundColor: colors.primary,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    alignItems: "center",
    justifyContent: "center",
  },
  mapViewButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: sizes.body,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
  addReviewContainer: {
    marginHorizontal: spacing.l,
    marginTop: spacing.m,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.s,
  },
  ratingLabel: {
    fontSize: sizes.body,
    color: colors.lightGray,
    marginRight: spacing.s,
  },
  ratingStars: {
    marginLeft: spacing.s,
  },
  reviewContainer: {
    marginBottom: spacing.s,
  },
  reviewLabel: {
    fontSize: sizes.body,
    color: colors.lightGray,
    marginBottom: spacing.s,
  },
  reviewLabelLocation: {
    fontSize: sizes.body,
    color: colors.lightGray,
    marginBottom: spacing.s,
    marginLeft: 25,
    top: 10,
  },
  reviewInput: {
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: spacing.s,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: spacing.s,
    alignItems: "center",
  },
  addButtonLabel: {
    color: colors.white,
    fontWeight: "bold",
  },
})

export default TourDetailsCard
