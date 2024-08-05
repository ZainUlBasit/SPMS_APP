import * as React from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import AmountCard from "../../components/Cards/AmountCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused hook

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const CustomerState = useSelector((state) => state.CustomerState);
  const AuthState = useSelector((state) => state.AuthState);
  const isFocused = useIsFocused(); // Use useIsFocused hook

  React.useEffect(() => {
    const getCurrentCustomer = async () => {
      const fetchedUser = await AsyncStorage.getItem("user");
      dispatch(fetchCustomers(fetchedUser));
    };

    // Fetch customers only when the screen is focused
    if (isFocused) {
      getCurrentCustomer();
    }
  }, [isFocused]); // Trigger useEffect when isFocused changes

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {CustomerState.loading ? (
        <ActivityIndicator size="large" color="#5a4ae3" />
      ) : (
        // <ScrollView >
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <AmountCard
            Data={[
              {
                label: "Total",
                value: CustomerState.data.total || "-",
              },
              { label: "Discount", value: CustomerState.data.discount || 0 },
              { label: "Paid", value: CustomerState.data.paid || 0 },
              { label: "Remaining", value: CustomerState.data.remaining || 0 },
            ]}
          />
          <AmountCard
            Data={[
              {
                label: "Total Quantity",
                value: CustomerState.data.total || "-",
              },
            ]}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textDecorationLine: "underline",
              color: "#5a4ae3",
            }}
            onPress={() => navigation.navigate("Items")}
          >
            Buy more items
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
