import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const CalendarPick = () => {
  const today = new Date()
  const [checkInDate, setCheckInDate] = useState(today)
  const [checkOutDate, setCheckOutDate] = useState(today)

  const [numAdults, setNumAdults] = useState(1)
  const [numChildren, setNumChildren] = useState(0)
  const [numRooms, setNumRooms] = useState(1)
  const [showCalendar, setShowCalendar] = useState(false)

  const navigation = useNavigation()
  const handleCheckInChange = (event, selectedDate) => {
    setShowCalendar(false)
    if (selectedDate) {
      setCheckInDate(selectedDate)
    }
  }

  const handleCheckOutChange = (event, selectedDate) => {
    setShowCalendar(false)
    if (selectedDate) {
      setCheckOutDate(selectedDate)
    }
  }

  const handleNumChange = (type, value) => {
    if (type === "adults") {
      setNumAdults(value)
    } else if (type === "children") {
      setNumChildren(value)
    } else if (type === "rooms") {
      setNumRooms(value)
    }
  }

  const handleSearch = () => {
    // Perform search with selected options
  }

  const isDateDisabled = (date) => {
    const currentDate = new Date()
    const twoMonthsFromNow = new Date()
    twoMonthsFromNow.setMonth(currentDate.getMonth() + 2)
    return date < currentDate || date > twoMonthsFromNow
  }

  const twoMonthsFromNow = new Date()
  twoMonthsFromNow.setMonth(today.getMonth() + 2)

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#003580",
          height: 65,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 25,
            padding: 8,
          }}
        >
          <Ionicons name="bed-outline" size={24} color="white" />
          <Text
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Stays
          </Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-airplane-outline" size={26} color="white" />
          <Text
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Flights
          </Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="car-outline" size={26} color="white" />
          <Text
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Car Rental
          </Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="uber" size={26} color="white" />
          <Text
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Taxi
          </Text>
        </Pressable>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.datePickerButtonText}>Check-In</Text>
          <Text style={styles.datePickerDateText}>
            {checkInDate ? checkInDate.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.datePickerButtonText}>Check-Out</Text>
          <Text style={styles.datePickerDateText}>
            {checkOutDate ? checkOutDate.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>
      </View>
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <DateTimePicker
            value={checkInDate || new Date()}
            onChange={handleCheckInChange}
            mode="date"
            minimumDate={new Date()}
            maximumDate={
              isDateDisabled(checkInDate)
                ? undefined
                : checkOutDate || undefined
            }
            locale="en_GB"
            minuteInterval={15}
            androidVariant="nativeAndroid"
            style={{ marginBottom: 20 }}
            disabled={false}
          />
          <DateTimePicker
            value={checkOutDate || new Date()}
            onChange={handleCheckOutChange}
            mode="date"
            minimumDate={checkInDate || new Date()}
            maximumDate={
              isDateDisabled(checkOutDate) ? undefined : twoMonthsFromNow
            }
            locale="en_GB"
            minuteInterval={15}
            androidVariant="nativeAndroid"
            style={{ marginBottom: 20 }}
            disabled={false}
          />
        </View>
      )}
      <View style={[styles.counterSection, { alignSelf: "center" }]}>
        <View style={styles.counterRow}>
          <Text style={styles.adultLabel}>Adults</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("adults", numAdults - 1)}
            disabled={numAdults === 1}
          >
            <Icon name="minus" size={16} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{numAdults}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("adults", numAdults + 1)}
            disabled={numAdults === 5}
          >
            <Icon name="plus" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
        <View style={styles.counterRow}>
          <Text style={styles.childrenLabel}>Children</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("children", numChildren - 1)}
            disabled={numChildren === 0}
          >
            <Icon name="minus" size={16} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{numChildren}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("children", numChildren + 1)}
            disabled={numChildren === 5}
          >
            <Icon name="plus" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
        <View style={styles.counterRow}>
          <Text style={styles.label}>Rooms</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("rooms", numRooms - 1)}
            disabled={numRooms === 1}
          >
            <Icon name="minus" size={16} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{numRooms}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleNumChange("rooms", numRooms + 1)}
            disabled={numRooms === 3}
          >
            <Icon name="plus" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text
          style={styles.searchButtonText}
          onPress={() => navigation.navigate("Home")}
        >
          Search
        </Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            backgroundColor: "#003580",
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 7,
            }}
          >
            Genius
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
            You are at genius level one in our loyalty program
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            borderColor: "#E0E0E0",
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 7,
            }}
          >
            15% Discounts
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Complete 5 stays to unlock level 2
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            borderColor: "#E0E0E0",
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 7,
            }}
          >
            10% Discounts
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Enjoy Discounts at participating at properties worldwide
          </Text>
        </Pressable>
      </ScrollView>

      <Pressable
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 200, height: 50, resizeMode: "cover" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
          }}
        />
      </Pressable>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerDiscountContainer}>
            <Text style={styles.footerDiscountText}>
              15% Discount on your next reservation
            </Text>
          </View>
          <View style={styles.footerBookNowContainer}>
            <TouchableOpacity style={styles.footerBookNowButton}>
              <Text style={styles.footerBookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerLogoContainer}></View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Book your perfect stay</Text>
        </View>
        <View style={styles.footerGuestsContainer}>
          <Text style={styles.footerGuestsText}>
            {numAdults} Adults, {numChildren} Children, {numRooms} Rooms
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  // header: {
  //   alignItems: "center",
  //   marginBottom: 20,
  // },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#777",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  datePickerButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    margin: 5,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  datePickerDateText: {
    fontSize: 16,
    color: "#777",
  },
  calendarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  counterSection: {
    marginBottom: 20,
    alignSelf: "center",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  counterButton: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
  },
  counterText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#777",
    marginRight: 15,
    alignSelf: "center",
  },
  childrenLabel: {
    fontSize: 16,
    color: "#777",
    marginRight: 6,
    alignSelf: "center",
  },
  adultLabel: {
    fontSize: 16,
    color: "#777",
    marginRight: 18,
    alignSelf: "center",
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  searchButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerDiscountContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  footerDiscountText: {
    fontSize: 14,
    color: "#777",
  },
  footerBookNowContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerBookNowButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  footerBookNowText: {
    fontSize: 14,
    color: "#fff",
  },
  footerLogoContainer: {
    alignItems: "center",
  },
  footerLogo: {
    width: 100,
    height: 50,
  },
  footerTextContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  footerGuestsContainer: {
    alignItems: "center",
  },
  footerGuestsText: {
    fontSize: 14,
    color: "#777",
  },
})

export default CalendarPick
