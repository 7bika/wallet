import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native"
import React, { useState } from "react"

const ResetPasswordScreen = ({ navigation }) => {
  const [input, setInput] = useState("")

  const inputHandler = (text) => {
    setInput(text)
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ top: 100, alignSelf: "center", color: "#cc9900" }}>
        {" "}
        forgot your password ?{" "}
      </Text>
      <TextInput
        style={styles.email}
        keyboardType="email-address"
        placeholder="enter your email"
        value={input}
        onTextInput={inputHandler}
        autoCapitalize="none"
      />
      {/* <Text> {input} </Text> */}
      <TouchableHighlight
        style={styles.reset}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert("Pressed!")}
      >
        <Text> Reset Password</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  email: {
    borderWidth: 2,
    borderColor: "#cc9900",
    padding: 10,
    margin: 10,
    width: 300,
    alignSelf: "center",
    height: 50,
    top: 100,
  },
  reset: {
    alignItems: "center",
    borderBottomColor: "#cc9900",
    borderBottomEndRadius: 5,
    justifyContent: "center",
    margin: 10,
    marginTop: 100,
  },
})

export default ResetPasswordScreen
