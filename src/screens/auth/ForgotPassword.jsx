import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native"
import React, { useState } from "react"

const ForgotPassword = (props) => {
  const { onPress } = props

  return (
    <View>
      <TouchableHighlight underlayColor="yellow" onPress={onPress}>
        <Text style={styles.forgotPassword} onPress={onPress}>
          forgot password? click here to reset your password?
        </Text>
        {/* <TextInput value={value} onTextChange={inputHandler} /> */}
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default ForgotPassword
