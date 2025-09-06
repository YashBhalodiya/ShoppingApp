import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id, title, price, image } = useLocalSearchParams();
  const router = useRouter();

  const handleBack = () =>{
    router.back();
    console.log("Back to home!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          onPress={handleBack}
          name="arrow-back"
          color={"#721f1fff"}
          size={26}
          style={styles.iconButton}
        />

        <View style={styles.rightIconsContainer}>
          <Ionicons
            name="heart-outline"
            color={"#721f1fff"}
            size={26}
            style={[styles.iconButton, { marginRight: 12 }]}
          />
          <Ionicons
            name="share-outline"
            color={"#721f1fff"}
            size={26}
            style={styles.iconButton}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.productImage} resizeMode="contain" />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productText}>{title}</Text>
        <Text style={styles.productText}>$ {price}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#ecececff",
    padding: 8,
    borderRadius: 60,
  },
  rightIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer:{
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 16
  },
  productImage:{
    width: 300,
    height: 300
  },
  detailsContainer:{
    marginHorizontal: 16,
    marginVertical: 30,
    borderWidth: 2
  },
  productText:{
    fontSize: 20,
    fontWeight: 'bold',
    
  }
});
