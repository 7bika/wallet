import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"

function User({ user }) {
  return (
    <View style={styles.profile}>
      {/* <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text> */}
      <Text style={styles.text}> hi there </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})

export default User
