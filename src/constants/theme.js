import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const colors = {
  primary: "#000000",
  gray: "#C2B7B7",
  lightGray: "#7A7575",
  light: "#FAF6F6A6",
  white: "#fff",
  black: "#000000",
}

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
}

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 14,
  radius: 16,
}

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
}
