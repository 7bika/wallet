import React, { useState } from "react"
import { View, Text, TextInput, Button, Image } from "react-native"
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button as PaperButton,
} from "react-native-paper"
import ImagePicker from "react-native-image-picker"

import { useNavigation } from "@react-navigation/native"

const User = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)

  const navigation = useNavigation()

  const updatePassword = () => {
    // Logic to update the user's password
  }

  const updateEmail = () => {
    // Logic to update the user's email
  }

  const selectImage = () => {
    const options = {
      title: "Select Image",
      mediaType: "photo",
      quality: 0.7,
      maxWidth: 300,
      maxHeight: 300,
      allowsEditing: true,
      aspectRatio: [1, 1],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else {
        const source = { uri: response.uri }
        setProfileImage(source)
      }
    })
  }

  const logout = () => {
    // Logic to clear user session and navigate to login screen
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Card style={{ width: "80%" }}>
        <Card.Content style={{ alignItems: "center" }}>
          <Avatar.Image size={100} source={profileImage} />
          <Button title="Select Image" onPress={selectImage} />
          <Title>User Profile</Title>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="New Password"
            style={{ marginTop: 20 }}
          />
          <Button title="Update Password" onPress={updatePassword} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="New Email"
            style={{ marginTop: 20 }}
          />
          <Button title="Update Email" onPress={updateEmail} />
        </Card.Content>
        <Text style={{ marginTop: 20, alignSelf: "center" }}>
          Total spending 🤑 9999$
        </Text>
        <Card.Actions style={{ justifyContent: "center" }}>
          <PaperButton
            mode="contained"
            onPress={logout}
            style={{ marginTop: 20 }}
          >
            Logout
          </PaperButton>
        </Card.Actions>
      </Card>
    </View>
  )
}

export default User
