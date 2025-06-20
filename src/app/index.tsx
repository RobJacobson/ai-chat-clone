import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white text-black dark:bg-black dark:text-white ">
      <Text className="font-bold text-3xl text-black dark:text-white">
        Home
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
