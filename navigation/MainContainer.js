import * as React from "react";
import {
  View,
  StatusBar,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ItemsScreen from "./screens/ItemsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CartScreen from "./screens/CartScreen";
import UserScreen from "./screens/UserScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth } from "../store/Slices/AuthSlice";
import { createStackNavigator } from "@react-navigation/stack";

// Screen names
const homeName = "Home";
const itemsName = "Items";
const paymentName = "Payments";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthState);

  React.useEffect(() => {
    const fetchUserAndToken = async () => {
      try {
        // await AsyncStorage.removeItem("user");
        // await AsyncStorage.removeItem("token");
        const fetchedUser = await AsyncStorage.getItem("user");
        const fetchedToken = await AsyncStorage.getItem("token");
        console.log("UserToken:", fetchedUser);
        setUser(fetchedUser);
        setToken(fetchedToken);
        dispatch(SetAuth(fetchedUser));
        // Set user and token in your application state or context as needed
        // Example:
        // dispatch(setUser(user));
        // dispatch(setToken(token));
      } catch (error) {
        console.error("Error fetching user and token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndToken();
  }, []); // Add AsyncStorage as a dependency

  if (isLoading) return <ActivityIndicator size={"large"} color={"#5a4ae3"} />;

  return (
    <View style={{ flex: 1 }}>
      {!user && (
        <StatusBar backgroundColor="aliceblue" barStyle="dark-content" />
      )}

      <View style={styles.header}>
        <Text style={styles.headerText}>Irshad Carton Dealer</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          // screenOptions={{
          //   tabBarStyle: {
          //     backgroundColor: "#5a4ae3", // Background color of the bottom navigator
          //   },
          // }}
          barStyle={{ backgroundColor: "#5a4ae3", elevation: 5 }} // Add elevation for Android shadow
          activeColor="#fff"
          inactiveColor="aliceblue"
          activeIndicatorStyle={{ backgroundColor: "#000" }}
          // tabBarStyle
          // tabBarIcon={}
        >
          <Tab.Screen
            name={homeName}
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={itemsName}
            component={ItemsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="list" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={paymentName}
            component={PaymentScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="cash" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={"Cart"}
            component={CartScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="cart" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={"User"}
            component={UserScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5a4ae3", // Change background color to #5a4ae3
    padding: 15,
    paddingTop: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 5.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerText: {
    color: "#ffffff", // Change text color to white
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default MainContainer;
