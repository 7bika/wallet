import React, { useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native"
import { Video } from "expo-av"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "react-native-elements"

const Welcome = ({ navigation }) => {
  const video = useRef(null)
  const [status, setStatus] = useState({})
  const fadeAnim = useRef(new Animated.Value(0)).current

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await video.current.pauseAsync()
    } else {
      await video.current.playAsync()
    }
  }

  const handleAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.videoContainer, { opacity: fadeAnim }]}>
        <Video
          ref={video}
          source={require("./../../../assets/beach.mp4")}
          style={styles.video}
          shouldPlay
          resizeMode="cover"
          useNativeControls
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          isMuted={false}
          onLoad={handleAnimation}
        />
      </Animated.View>

      <Text style={styles.text}>Welcome</Text>

      <Button
        title="Log In"
        buttonStyle={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
        icon={<Ionicons name="log-in" size={20} color="white" />}
      />

      <Button
        title="Sign Up"
        buttonStyle={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate("Signup")}
        icon={<Ionicons name="person-add" size={20} color="white" />}
      />

      <TouchableOpacity
        style={[styles.button, styles.playPauseButton]}
        onPress={handlePlayPause}
      >
        <Ionicons
          name={
            status.isPlaying ? "pause-circle-outline" : "play-circle-outline"
          }
          size={40}
          color="white"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  video: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderColor: "#007AFF",
  },
  signupButton: {
    backgroundColor: "transparent",
    borderColor: "#cc9900",
  },
  playPauseButton: {
    backgroundColor: "transparent",
    borderColor: "#FF2D55",
    borderWidth: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Welcome
