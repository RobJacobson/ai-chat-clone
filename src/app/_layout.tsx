import "../global.css";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HistoryChatsDrawer from "~/components/HistoryChatsDrawer";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useTheme } from "~/hooks/useTheme";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";

// Theme objects will be created dynamically using the useTheme hook

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme, navigationTheme, colors } = useTheme();

  const currentTheme: Theme = {
    ...(isDarkColorScheme ? DarkTheme : DefaultTheme),
    colors: navigationTheme.colors,
  };

  return (
    <ThemeProvider value={currentTheme}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={HistoryChatsDrawer}
          screenOptions={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: colors.navigation.background,
            },
            headerRight: () => <ThemeToggle />,
            drawerInactiveTintColor: isDarkColorScheme ? "white" : "black",
            drawerStyle: {
              backgroundColor: colors.navigation.card,
              borderRightColor: colors.navigation.border,
              borderWidth: StyleSheet.hairlineWidth,
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "ChatGPT",
              drawerIcon: () => (
                <FontAwesome5 name="robot" color={"white"} size={20} />
              ),
            }}
          />
          <Drawer.Screen
            name="chat/[id]"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <PortalHost />
    </ThemeProvider>
  );
}

// <Stack>
//   <Stack.Screen
//     name="index"
//     options={{
//       title: "Starter Base",
//       headerRight: () => <ThemeToggle />,
//     }}
//   />
// </Stack>;

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);

  // Listen for appearance changes
  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setAndroidNavigationBar(colorScheme ?? "light");
    });

    return () => subscription?.remove();
  }, []);
}

function noop() {}
