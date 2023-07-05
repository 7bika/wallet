import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native"
import { Avatar, Card, Title, Button as PaperButton } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"

const User = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [pictures, setPictures] = useState([])

  const navigation = useNavigation()

  const updatePassword = () => {
    // Logic to update the user's password
  }

  const updateEmail = () => {
    // Logic to update the user's email
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.uri)
    } else {
      alert("You did not select any image.")
    }
  }

  const addPicture = (photo) => {
    setPictures((prevPictures) => [...prevPictures, photo])
  }

  const deletePicture = (index) => {
    setPictures((prevPictures) => {
      const newPictures = [...prevPictures]
      newPictures.splice(index, 1)
      return newPictures
    })
  }

  const logout = () => {
    // Logic to clear user session and navigate to the login screen
  }

  const deactivateAccount = () => {
    // Logic to deactivate user account
  }

  const goToSubscription = () => {
    // Logic to navigate to the subscription screen
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar.Image size={100} source={{ uri: profileImage }} />

          <TouchableOpacity style={styles.selectImage} onPress={pickImageAsync}>
            <Text style={styles.selectImageText}>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.takePicture}
            onPress={() => navigation.navigate("Picture")}
          >
            <Text style={styles.takePictureText}>
              You can also take pictures and share them with friends
            </Text>
          </TouchableOpacity>
          <Title style={styles.title}>User Profile</Title>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="New Password"
            style={styles.input}
          />
          <Button title="Update Password" onPress={updatePassword} />

          <TextInput placeholder="old Email" style={styles.input} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="New Email"
            style={styles.input}
          />
          <Button title="Update Email" onPress={updateEmail} />
        </View>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.spendingText}>Total spending 🤑 9999$</Text>
          <View style={styles.picturesContainer}>
            {pictures.map((picture, index) => (
              <Card key={index} style={styles.pictureCard}>
                <Card.Cover source={{ uri: picture.uri }} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePicture(index)}
                >
                  <AntDesign name="close" size={30} color="white" />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonAccount}
              onPress={deactivateAccount}
            >
              <FontAwesome name="user-times" size={24} color="white" />
              <Text style={styles.buttonText}>Deactivate Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSubscription}
              onPress={goToSubscription}
            >
              <FontAwesome name="dollar" size={24} color="white" />
              <Text style={styles.buttonText}>My Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>
        <PaperButton
          mode="contained"
          onPress={logout}
          style={styles.logoutButton}
        >
          Logout
        </PaperButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  selectImage: {
    marginTop: 10,
  },
  selectImageText: {
    color: "#0066FF",
    textDecorationLine: "underline",
  },
  takePicture: {
    marginTop: 10,
    alignItems: "center",
  },
  takePictureText: {
    textAlign: "center",
    color: "#999999",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: "80%",
  },
  additionalInfoContainer: {
    alignItems: "center",
  },
  spendingText: {
    marginTop: 20,
    fontSize: 18,
    alignSelf: "center",
  },
  picturesContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
  pictureCard: {
    marginBottom: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "60%",
  },
  buttonSubscription: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    // paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAccount: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 30,
    width: "80%",
  },
})

export default User
