import React, { useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setKey((prevKey) => prevKey + 1);
    setTimeout(() => setRefreshing(false), 2000); // Adjust the timeout as needed
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          key={key}
          style={styles.webview}
          source={{ uri: "https://spms-next-customer.vercel.app" }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
