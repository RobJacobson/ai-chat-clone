import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useImagePicker = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        quality: 0.8, // Reduce quality for better performance
        allowsEditing: true,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const clearImage = () => {
    setImageBase64(null);
  };

  return {
    imageBase64,
    pickImage,
    clearImage,
  };
};
