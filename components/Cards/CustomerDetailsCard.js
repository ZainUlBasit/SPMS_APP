import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const CustomerDetailsCard = ({ customer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{customer.name}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{customer.email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{customer.contact}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{customer.address}</Text>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5a4ae3",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: 400,
    alignSelf: "center", // Center the card
    width: screenWidth * 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
    textAlign: "center",
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    width: 100,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    fontSize: 18,
  },
  value: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
  },
});

export default CustomerDetailsCard;
