import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native"

const EditUser = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false)
  const [actionToConfirm, setActionToConfirm] = useState("")

  const updatePassword = () => {
    setActionToConfirm("updatePassword")
    setIsConfirmationModalVisible(true)
  }

  const updateEmail = () => {
    setActionToConfirm("updateEmail")
    setIsConfirmationModalVisible(true)
  }

  const deactivateAccount = () => {
    setActionToConfirm("deactivateAccount")
    setIsConfirmationModalVisible(true)
  }

  const cancelSubscription = () => {
    setActionToConfirm("cancelSubscription")
    setIsConfirmationModalVisible(true)
  }

  const confirmAction = () => {
    switch (actionToConfirm) {
      case "updatePassword":
        // Logic to update the user's password
        setPassword("")
        setIsConfirmationModalVisible(false)
        break
      case "updateEmail":
        // Logic to update the user's email
        setEmail("")
        setIsConfirmationModalVisible(false)
        break
      case "deactivateAccount":
        // Logic to deactivate user account
        setIsConfirmationModalVisible(false)
        break
      case "cancelSubscription":
        // Logic to cancel user's subscription
        setIsConfirmationModalVisible(false)
        break
      default:
        break
    }
  }

  const cancelAction = () => {
    setIsConfirmationModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User Information</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="New Password"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="New Email"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={updateEmail}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deactivateAccount}>
        <Text style={styles.buttonText}>Deactivate Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={cancelSubscription}>
        <Text style={styles.buttonText}>Cancel Subscription</Text>
      </TouchableOpacity>

      <Modal
        visible={isConfirmationModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are You Sure?</Text>
            <Text style={styles.modalText}>
              Do you want to perform this action?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Button title="No" onPress={cancelAction} color="#999999" />
              <Button title="Yes" onPress={confirmAction} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: "80%",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0066FF",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%",
  },
})

export default EditUser
