import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-paper";

const AmountCard = ({ Data }) => {
  return (
    <Card style={styles.card}>
      {Data.map((dt, i) => {
        return (
          <View style={styles.content} key={i}>
            <Text style={styles.label}>{`${dt.label}:`}</Text>
            <Text style={styles.amount}>{`${dt.value} /-`}</Text>
          </View>
        );
      })}
    </Card>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    maxWidth: 500,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 4, // Add elevation for shadow effect
    backgroundColor: "#5a4ae3",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff", // Adjust label color
  },
  amount: {
    fontSize: 25,
    color: "#fff", // Adjust amount color
  },
});

export default AmountCard;
