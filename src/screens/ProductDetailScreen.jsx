import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id, title, price, image } = useLocalSearchParams();
  const router = useRouter();
  
  // State for interactive elements
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Mock data for enhanced UI
  const productImages = [
    { uri: image },
    { uri: image },
    { uri: image }
  ];
  
  const colorVariants = [
    { color: '#2C2C2C', name: 'Black' },
    { color: '#E8E8E8', name: 'Silver' },
    { color: '#F5F5DC', name: 'Beige' }
  ];

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add haptic feedback animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShare = () => {
    // Share functionality
    console.log("Share product");
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { id, title, price, quantity });
    // Add to cart logic
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { id, title, price, quantity });
    // Buy now logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerRightButtons}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? "#FF4757" : "#000"} 
              />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.mainImageContainer}>
            <Image 
              source={{ uri: image }} 
              style={styles.mainProductImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === selectedImageIndex && styles.activeIndicator
                ]}
              />
            ))}
          </View>
          
          {/* Thumbnail Images */}
          <View style={styles.thumbnailContainer}>
            {productImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  index === selectedImageIndex && styles.activeThumbnail
                ]}
              >
                <Image source={img} style={styles.thumbnailImage} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.productTitle}>{title}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>${price}</Text>
            <View style={styles.taxInfo}>
              <Text style={styles.taxText}>Including taxes and duties</Text>
            </View>
          </View>

          {/* Color Selection and Rating in horizontal row */}
          <View style={styles.horizontalRow}>
            {/* Color Selection */}
            <View style={styles.colorSection}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorOptions}>
                {colorVariants.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(index)}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color.color },
                      index === selectedColor && styles.selectedColorOption
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Rating Section */}
            <View style={styles.ratingSection}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={16}
                    color={star <= 4 ? "#FFD700" : "#E0E0E0"}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>4.8 (231)</Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Premium quality materials</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>2 year warranty included</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Free shipping worldwide</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>30-day return policy</Text>
              </View>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Experience premium quality with this exceptional product. Crafted with attention to detail 
              and built to last, it offers the perfect blend of style, functionality, and durability. 
              Ideal for daily use and designed to exceed your expectations.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="bag-add-outline" size={20} color="#000" />
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRightButtons: {
    flexDirection: "row",
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
  },
  mainImageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainProductImage: {
    width: "100%",
    height: "100%",
  },
  imageIndicators: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 15,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#FF6B35",
    width: 20,
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "#FF6B35",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 34,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35",
  },
  taxInfo: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  taxText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  colorSection: {
    flex: 1,
    marginRight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "transparent",
  },
  selectedColorOption: {
    borderColor: "#FF6B35",
  },
  ratingSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresList: {
    gap: 12,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  addToCartButton: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  buyNowButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});
