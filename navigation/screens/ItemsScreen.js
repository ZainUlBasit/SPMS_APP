import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/Slices/ItemSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemCard from "../../components/Cards/ItemCard";

export default function ItemsScreen({ navigation }) {
  const ItemState = useSelector((state) => state.ItemState);
  const isFocused = useIsFocused(); // Use useIsFocused hook
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState([]);

  React.useEffect(() => {
    const getItemsData = async () => {
      const fetchedUser = await AsyncStorage.getItem("user");
      dispatch(fetchItems(fetchedUser));
    };
    // Fetch items only when the screen is focused
    if (isFocused) {
      getItemsData();
    }
  }, [isFocused, dispatch]);

  React.useEffect(() => {
    // Filter items based on the search query
    const filtered = ItemState.data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [searchQuery, ItemState.data]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "aliceblue" }}>
      {!ItemState.loading && (
        <TextInput
          style={{
            borderColor: "#5a4ae3",
            borderWidth: 2,
            margin: 10,
            // paddingLeft: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            fontSize: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search items..."
        />
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {ItemState.loading ? (
            <ActivityIndicator size={"large"} color={"#5a4ae3"} />
          ) : (
            (searchQuery !== "" ? filteredItems : ItemState.data).map((dt) => {
              return <ItemCard key={dt._id} item={dt} />;
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
