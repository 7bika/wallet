import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native"
import { Avatar, Card, Title } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const User = () => {
  const navigation = useNavigation()

  const [profileImage, setProfileImage] = useState(null)
  const [totalSpendings, setTotalSpendings] = useState(9999)

  const handleLogout = () => {
    // Logic for logging out the user
  }

  const goToEditUser = () => {
    navigation.navigate("EditUser")
  }

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled) {
        setProfileImage(result.uri)
      } else {
        alert("You did not select any image.")
      }
    } catch (error) {
      console.log("Error selecting image:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsIcon} onPress={goToEditUser}>
            <AntDesign name="setting" size={24} color="black" />
          </TouchableOpacity>

          <Avatar.Image size={100} source={{ uri: profileImage }} />

          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.selectImageButtonText}>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sharePicturesButton}
            onPress={() => navigation.navigate("Picture")}
          >
            <Text style={styles.sharePicturesText}>
              maybe take a picture and share it with your friends ?
            </Text>
            <FontAwesome
              style={{ alignSelf: "center" }}
              name="camera"
              size={30}
              color="#0066FF"
            />
          </TouchableOpacity>

          <Title style={styles.totalSpendings}>
            Total spending 🤑 {totalSpendings}$
          </Title>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  card: {
    width: "80%",
  },
  content: {
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#0066FF",
    textDecorationLine: "underline",
  },
  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  selectImageButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  selectImageButtonText: {
    color: "#0066FF",
    textDecorationLine: "underline",
  },
  sharePicturesButton: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sharePicturesText: {
    margin: 5,
    color: "#999999",
    textAlign: "center",
  },
  totalSpendings: {
    marginTop: 20,
    alignSelf: "center",
  },
})

export default User
