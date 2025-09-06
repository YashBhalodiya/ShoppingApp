import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hotSales } from "../../src/constants/productData";

const categories = [
  "Technology",
  "Fashion",
  "Sports",
  "Technology",
  "Fashion",
  "Sports",
  "Technology",
  "Fashion",
  "Sports",
  "Technology",
  "Fashion",
  "Sports",
  "Technology",
  "Fashion",
  "Sports",
];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Starting fetch...");
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Data is fetched");
      setProducts(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const onItemPressed = (item) => {
    console.log("Item Pressed:", item);
    router.push({
      pathname: "/ProductDetailScreen",
      params: {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["left", "right"]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search Product" />
          <Ionicons name="notifications" size={23} color="black" />
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/images/bannerImg.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.categoryChip}>
              <Text style={{ fontWeight: "bold" }}>{item}</Text>
            </View>
          )}
          style={{ marginLeft: 16, marginVertical: 16 }}
        />

        <View style={styles.hotSalesContainer}>
          <View style={styles.hotSalesContainerHeader}>
            <Text>Hot Sales</Text>
            <Text>Scroll Indicator</Text>
          </View>

          <FlatList
            horizontal
            data={products}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onItemPressed(item)}>
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                  <Text style={styles.shipping}>Free shipping</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.recentlyViewedContainer}>
          <View style={styles.recentlyViewedContainerHeader}>
            <Text>Recently Viewed</Text>
            <Text>Scroll Indicator</Text>
          </View>

          <FlatList
            horizontal
            data={hotSales}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onItemPressed(item)}>
                <View style={styles.card}>
                  <Image
                    source={item.img}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                  <Text style={styles.shipping}>Free shipping</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 64,
    padding: 12,
    flex: 1,
    marginRight: 12,
    backgroundColor: "#F7F7F7",
  },
  bannerContainer: {
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  hotSalesContainer: {
    marginTop: 16,
  },
  hotSalesContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 8,
    marginVertical: 8,
    padding: 12,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  shipping: {
    fontSize: 12,
    color: "green",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 66,
  },
  recentlyViewedContainer: {
    marginTop: 16,
  },
  recentlyViewedContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
  },
});
