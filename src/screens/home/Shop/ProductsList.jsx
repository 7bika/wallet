import * as React from "react"
import { FlatList } from "react-native"
import { products } from "./../../../../products"
import ProductCard from "./ProductCard"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function ProductsList() {
  const navigation = useNavigation()
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <ProductCard {...item} />
        </TouchableOpacity>
      )}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  )
}
