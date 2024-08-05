import * as React from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetAuth } from "../store/Slices/AuthSlice";
import LoginScreen from "./LoginScreen/LoginScreen";
import MainContainer from "../navigation/MainContainer";

function ProtectedScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const AuthState = useSelector((state) => state.AuthState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchUserAndToken = async () => {
      try {
        // await AsyncStorage.removeItem("user");
        // await AsyncStorage.removeItem("token");
        const fetchedUser = await AsyncStorage.getItem("user");
        setUser(JSON.parse(fetchedUser));
        console.log(JSON.parse(fetchedUser));
        const allKeys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(allKeys);
        console.log("All AsyncStorage data:", data);
        // dispatch(SetAuth(JSON.parse(fetchedUser)));
        dispatch(
          SetAuth({
            name: "Zain ",
            email: "zainulbasit4861@gmail.com",
          })
        );
      } catch (error) {
        console.error("Error fetching user and token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndToken();
  }, []); // Add AsyncStorage as a dependency

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <React.Fragment>
      {!AuthState.data ? <LoginScreen /> : <MainContainer />}
    </React.Fragment>
  );
}

export default ProtectedScreen;
