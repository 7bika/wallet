import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { useState, useEffect } from "react"
import React from "react"
import Logo from "./../../../assets/dev-images/hote2-removebg-preview.png"
import CustomInput from "../../components/custom/CustomInput"
import CustomButton from "../../components/custom/CustomButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AntDesign } from "@expo/vector-icons"
import { Svg, Path } from "react-native-svg"

const Login = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  // * verify email and password :
  const [loading, setLoading] = useState(false)

  // * animation
  const fadeAnim = new Animated.Value(0)
  const opacityAnim = new Animated.Value(0)
  const logoAnim = new Animated.Value(0)
  const formAnim = new Animated.Value(0)
  const buttonAnim = new Animated.Value(0)
  const buttonTextAnim = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
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
    Animated.timing(buttonTextAnim, {
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

  const handleSubmit = async () => {
    setLoading(true)

    // const validEmail = validator.isEmail(email)
    // const validEmailConfirm = email.validEmail()
    // const validName = validator.isAlpha(name)

    // const validPassword = (password.trim().length !== 0 && password.trim().length > 5)

    if (!name || !email || !password || !passwordConfirm) {
      alert("All fields are required")
      setLoading(false)
      return
    }

    // console.log("SIGNUP REQUEST => ", name, email, password);
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/signup",
        {
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        }
      )

      if (data.error) {
        alert(data.error)
        setLoading(false)
      } else {
        // * save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data))
        setLoading(false)
        console.log("SIGN IN SUCCESS => ", data)
        alert("Sign up successful")

        // * redirect
        navigation.navigate("Signin")
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* You can replace the background image with your own */}
        {/* <Image
          source={require("./../../../assets/background-image.jpg")}
          style={styles.backgroundImage}
        /> */}
        <View style={styles.box}>
          <Svg
            height="100%"
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
          >
            <Path fill="#3b5998" d="M0,224L1440,32L1440,320L0,320Z" />
          </Svg>
        </View>
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
        <Text style={styles.title}>Create An Account</Text>

        <CustomInput
          icon="person-circle-outline"
          placeholder="Name"
          value={name}
          setValue={setName}
          keyboardType="default"
        />

        <CustomInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          keyboardType="default"
        />
        <CustomInput
          icon="lock-closed-outline"
          placeholder="Confirm your Password"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          secureTextEntry
          keyboardType="default"
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
            title="sign up"
            loading={loading}
            onPress={handleSubmit}
          />
          <TouchableHighlight
            underlayColor={"grey"}
            style={styles.goback}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <AntDesign name="leftcircle" size={30} color="black" />
          </TouchableHighlight>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
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
    backgroundColor: "white",
    padding: 20,
    elevation: 5,
  },
  logo: {
    height: "130%",
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  customButton: {
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "grey",
    fontSize: 10,
    fontWeight: "bold",
  },
  goback: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    padding: 5,
  },
  top: {},
  bottom: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    bottom: 0,
  },
  box: {
    backgroundColor: "#2471A3",
    height: 80,
  },
  bottomWavy: {
    position: "absolute",
    bottom: 20,
  },
})

export default Login
