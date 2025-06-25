import { useEffect, useRef } from "react";
import type { FlatList } from "react-native-gesture-handler";

import { UI_CONSTANTS } from "@/lib/constants";

export const useScrollToBottom = (itemCount: number) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (itemCount > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, UI_CONSTANTS.SCROLL_DELAY);

      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return flatListRef;
};
