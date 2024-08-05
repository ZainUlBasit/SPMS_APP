import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomerDetailsCard from "../../components/Cards/CustomerDetailsCard";
import { SetAuthNotFound } from "../../store/Slices/AuthSlice";

export default function UserScreen({ navigation }) {
  const CustomerState = useSelector((state) => state.CustomerState);
  const AuthState = useSelector((state) => state.AuthState);
  const isFocused = useIsFocused(); // Use useIsFocused hook
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log(await AsyncStorage.getItem("user"));
    console.log("Data:", AuthState.data);
    // Implement logic to clear user data and navigate to the login screen
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    // navigation.navigate("Login");

    dispatch(SetAuthNotFound());
  };

  React.useEffect(() => {
    const getCurrentCustomer = async () => {
      const fetchedUser = await AsyncStorage.getItem("user");
      dispatch(fetchCustomers(fetchedUser));
    };
    // Fetch customers only when the screen is focused
    if (isFocused) {
      getCurrentCustomer();
    }
  }, [isFocused, dispatch]); // Trigger useEffect when isFocused changes

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {CustomerState.loading ? (
        <ActivityIndicator size={"large"} color={"#5a4ae3"} />
      ) : (
        <>
          <CustomerDetailsCard customer={CustomerState?.data} />
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
            <Text style={{ color: "#5a4ae3", fontSize: 18 }}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
