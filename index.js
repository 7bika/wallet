import "react-native-gesture-handler"
import { registerRootComponent } from "expo"
import { AppRegistry } from "react-native"
import { name } from "./app.json"
import User from "./src/screens/home/User" // Replace 'User' with the correct component name
import App from "./App"

// AppRegistry.registerComponent("main", () => User)

AppRegistry.registerComponent("name", () => App)
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
