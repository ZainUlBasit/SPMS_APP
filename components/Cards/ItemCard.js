import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ItemCard = ({ item }) => {
  const addToCart = () => {
    // Implement logic to add item to cart
    console.log("Added to cart:", item.name);
  };
  return (
    <View style={styles.container}>
      <Image
        source={
          item?.imageUri
            ? { uri: item.imageUri }
            : {
                uri: "https://firebasestorage.googleapis.com/v0/b/wfw-system.appspot.com/o/images%2Fitems%2FFruit%20Carons.png?alt=media&token=8d4f1c5b-1dce-480a-8677-0156de318ef7",
              }
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>Quantity: {item.qty}</Text>
        <Text style={styles.itemDetails}>Price: ${item.sale}</Text>
        <Text style={styles.itemDetails}>Company: {item.companyId.name}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 10 }}>
            Add To Card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    maxWidth: 400,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#5a4ae3",
  },
  itemDetails: {
    fontSize: 16,
    marginBottom: 3,
    color: "#5a4ae3",
  },
  cartButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#5a4ae3",
    // marginRight: 10,
    padding: 10,
    marginVertical: 8,
  },
});

export default ItemCard;
