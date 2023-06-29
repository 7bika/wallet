import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Logo from "./../../../assets/dev-images/hote2-removebg-preview.png"
import CustomInput from "../../components/custom/CustomInput"
import CustomButton from "../../components/custom/CustomButton"
import ForgotPassword from "./ForgotPassword"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Svg, { Path } from "react-native-svg"
// * google and fb imports
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import * as Facebook from "expo-auth-session/providers/facebook"
import * as AuthSession from "expo-auth-session"
import { ResponseType } from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession()

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")
  const [userInfo, setUserInfo] = useState(null)

  // * handling google auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    expoClientSecret: "",
    responseType: ResponseType.Token,
    scopes: ["profile", "email"],
  })

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken)
      getUserInfo()
    }
  }, [response, token])

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const user = await response.json()
      console.log("USER INFO ", user)
      setUserInfo(user)

      navigation.navigate("Home")
    } catch (error) {
      alert("Something went wrong. Please try again later.")
      console.warn(error.message)
    }
  }

  // * animation when the page is first rendered
  const logoAnim = useState(new Animated.Value(0))[0]
  const formAnim = useState(new Animated.Value(0))[0]
  const buttonAnim = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    Animated.timing(formAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  const logoTranslateY = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  })

  const formTranslateY = formAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  const buttonOpacity = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const buttonTranslateY = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  })

  // * handling submit
  const handleSubmit = async () => {
    setLoading(true)

    if (!email || !password) {
      alert("All fields are required")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      )
      const data = response.data
      console.log(data)
      setLoading(false)
      alert("Login unsuccessful")
      if (data.error) {
        setLoading(false)
        alert(data.error)
        return
      } else {
        await AsyncStorage.setItem("@auth", JSON.stringify(data))
        setLoading(false)
        console.log("LOGIN IN SUCCESS ", data)

        navigation.navigate("Home")
      }
    } catch (err) {
      console.error(err)
      throw new Error(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {/* You can replace the background image with your own */}
        {/* <Image
          source={require("./../../../assets/background-image.jpg")}
          style={styles.backgroundImage}
        /> */}
        <Svg height="100%" width="100%" viewBox="0 0 1440 320">
          <Path fill="#3b5998" d="M0,224L1440,32L1440,320L0,320Z" />
        </Svg>
        <View style={styles.overlay} />
      </View>

      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoTranslateY }] },
        ]}
      >
        <Image style={styles.logo} source={Logo} resizeMode="contain" />
      </Animated.View>

      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: formTranslateY }] },
        ]}
      >
        <Text style={styles.title}>Let's Start By Logging In</Text>

        <CustomInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <CustomInput
          style={{}}
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}
        >
          <CustomButton
            title="Sign In"
            loading={loading}
            onPress={handleSubmit}
          />
        </Animated.View>

        <ForgotPassword
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        />

        <Text style={styles.signup}>
          Not yet registered?
          <TouchableOpacity
            style={{ left: 50, margin: 25 }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ color: "#C59361", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <Text> home</Text>
        </TouchableOpacity>

        {/* Google and Facebook Sign-In */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              promptAsync()
            }}
            style={[styles.socialButton, { backgroundColor: "#ff2222" }]}
            disabled={!request}
          >
            <Ionicons name="logo-google" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              promptAsync()
            }}
            style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
            disabled={!request}
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    elevation: 5,
  },
  logo: {
    height: "140%",
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  signup: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2222",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Login
