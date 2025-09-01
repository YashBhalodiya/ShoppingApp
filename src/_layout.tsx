import { Stack } from "expo-router";

export default function SrcLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="screens/home" 
        options={{ 
          headerShown: false,
          title: "Home"
        }} 
      />
      <Stack.Screen 
        name="screens/ProductDetailScreen" 
        options={{ 
          headerShown: false,
          title: "Product Details",
          presentation: "card"
        }} 
      />
    </Stack>
  );
}
