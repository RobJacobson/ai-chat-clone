import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text className="text-white">Chat Screen {id}</Text>
    </View>
  );
};

export default ChatScreen;
