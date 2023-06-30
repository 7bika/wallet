import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { products } from "./../../../../products"
import { AntDesign } from "@expo/vector-icons"
import { useColorScheme } from "nativewind"
import { useNavigation } from "@react-navigation/native"

export default function ProductDetails() {
  const route = useRoute()
  const id = route.params.id
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation()

  const [count, setCount] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [cart, setCart] = useState([])
  console.log("cart items", cart)

  const product = products.find((item) => item.id === id)

  if (count < 0) {
    setCount(0)
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true)
  }

  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((el) => el.id !== item.id))
  }

  const closeModal = () => {
    setIsAddedToCart(false)
  }

  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)

  const openRemoveModal = (item) => {
    setItemToRemove(item)
    setShowRemoveModal(true)
  }

  const closeRemoveModal = (removeItem) => {
    setShowRemoveModal(false)
    if (removeItem) {
      setCart(cart.filter((el) => el.id !== itemToRemove.id))
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name="md-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{product.title}</Text>
          </View>
          <View style={styles.detailsCard}>
            <View style={styles.detailsSection}>
              <Text style={styles.price}>
                Price: ${product.price.toFixed(2)}
              </Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            <View style={styles.countSection}>
              <View style={styles.countContainer}>
                <AntDesign
                  name="minuscircleo"
                  size={24}
                  color={colorScheme === "light" ? "black" : "white"}
                  onPress={() => setCount(count - 1)}
                />
                <Text style={styles.count}>{count}</Text>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colorScheme === "light" ? "black" : "white"}
                  onPress={() => setCount(count + 1)}
                />
              </View>
              <Text style={styles.totalPrice}>
                Total: ${product.price * count}
              </Text>
            </View>
          </View>
        </View>

        {!cart.some((item) => item.id === product.id) ? (
          <TouchableOpacity
            onPress={() => {
              handleAddToCart()
              setCart([...cart, product])
            }}
            style={[
              styles.button,
              { backgroundColor: colorScheme === "light" ? "black" : "white" },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme === "light" ? "white" : "black" },
              ]}
            >
              Add to Cart
            </Text>
            <AntDesign
              name="shoppingcart"
              size={24}
              color={colorScheme === "light" ? "white" : "black"}
              style={styles.cartIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => openRemoveModal(product)}
            style={[
              styles.button,
              { backgroundColor: colorScheme === "light" ? "black" : "white" },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme === "light" ? "white" : "black" },
              ]}
            >
              Remove from Cart
            </Text>
            <AntDesign
              name="shoppingcart"
              size={24}
              color={colorScheme === "light" ? "white" : "black"}
              style={styles.cartIcon}
            />
          </TouchableOpacity>
        )}

        <Modal visible={isAddedToCart} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Added to Cart! </Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showRemoveModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Remove from Cart?</Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => closeRemoveModal(false)}
                  style={[styles.modalButton, styles.modalButtonCancel]}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => closeRemoveModal(true)}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  arrow: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    borderRadius: 20,
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    marginBottom: 15,
  },
  detailsCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsSection: {
    flex: 1,
  },
  countSection: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  cartIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    height: 150,
    width: "70%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "gray",
    marginRight: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
})
