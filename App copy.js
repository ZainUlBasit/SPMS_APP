import * as React from "react";
import { ActivityIndicator } from "react-native";
import MainContainer from "./navigation/MainContainer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProtectedScreen from "./components/ProtectedScreen";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const fetchUserAndToken = async () => {
      try {
        // await AsyncStorage.removeItem("user");
        // await AsyncStorage.removeItem("token");
        const fetchedUser = await AsyncStorage.getItem("user");
        const fetchedToken = await AsyncStorage.getItem("token");
        setUser(fetchedUser);
        setToken(fetchedToken);
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
  }, [AsyncStorage]); // Add AsyncStorage as a dependency

  if (isLoading) {
    return <ActivityIndicator size="large" color="#5a4ae3" />;
  }

  return (
    <Provider store={store}>
      <ProtectedScreen />
      <Toast />
    </Provider>
  );
}

export default App;
