import React, { useState, useRef, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native"
import { useColorScheme } from "nativewind"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import ProductsList from "./../../home/Shop/ProductsList"
import { useNavigation } from "@react-navigation/native"

export default function Shop() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const navigation = useNavigation()

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <View className={"flex-row w-full gap-5"}>
        <Text className="dark:text-white text-2xl font-bold top-2">
          New collection
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={colorScheme === "dark" ? "#f5dd4b" : "#f4f3f4"}
          value={colorScheme === "dark"}
          onChange={toggleColorScheme}
        />
      </View>
      <ProductsList />

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate("Camera")}
      >
        <Image
          style={styles.cameraLogo}
          source={require("./../../../../assets/Camera-Logo.png")}
        />
      </TouchableOpacity>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cameraButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraLogo: {
    width: 30,
    height: 30,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  capturedPhoto: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
})
