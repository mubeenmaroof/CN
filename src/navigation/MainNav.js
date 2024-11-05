import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { showToast } from "../utils/help";
import { AdtPage } from "../screens/ADT/adtPage";
import { CustomerPage } from "../screens/Customer/customerPage";
import { AdtDetail } from "../screens/ADT/adtDetail";
import { CustomerDetail } from "../screens/Customer/customerDetail";
import { SignupPage } from "../screens/signup/signupPage";
import { SigninPage } from "../screens/signin/signinPage";
import { HomePage } from "../screens/home/homePage";
import { ForgetPage } from "../screens/forgetscreen/forgetScreen";
import { SplashScreen } from "../customcomponents/splashScreen";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

enableScreens();

const adtPage = "ADTPage";
const customerPage = "CustomerPage";
const adtDetail = "AdtDetail";
const customerDetail = "CustomerDetail";
const homPage = "HomePage";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// For Tab Navigation //

function MainTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === adtPage) {
            iconName = focused ? "location-sharp" : "location-sharp";
          } else if (rn === customerPage) {
            iconName = focused ? "location-sharp" : "location-sharp";
          } else if (rn === adtDetail) {
            iconName = focused ? "list-outline" : "list-outline";
          } else if (rn === customerDetail) {
            iconName = focused ? "list-outline" : "list-outline";
          } else if (rn === homPage) {
            iconName = focused ? "home-sharp" : "home-sharp";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        headerShown: false,
        tabBarStyle: { height: 70, padding: 10 },
      })}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerTitle: "Home Page" }}
      />
      <Tab.Screen
        name="ADTPage"
        component={AdtPage}
        options={{ headerTitle: "ADT Marking Page" }}
      />
      <Tab.Screen
        name="CustomerPage"
        component={CustomerPage}
        options={{ headerTitle: "Customer Marking Page" }}
      />
      <Tab.Screen
        name="AdtDetail"
        component={AdtDetail}
        options={{ headerTitle: "ADT Mark Details" }}
      />
      <Tab.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{ headerTitle: "Customer Mark Details" }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigation
function CustomDrawerContent({ navigation }) {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Successfully signed out
        showToast("success", "You are Successfully Sign out", "top");
        navigation.navigate("SigninPage"); // Redirect to the sign-in screen or any other desired destination
      })
      .catch((error) => {
        showToast("error", error, "top");
      });
  };
  return (
    <DrawerContentScrollView>
      {/* Add a custom Logout button */}
      <DrawerItem
        label="Sign in"
        onPress={() => navigation.navigate("SigninPage")}
      />

      {/* Add a custom Logout button */}
      <DrawerItem
        label="Sign up"
        onPress={() => navigation.navigate("SignupPage")}
      />
      <DrawerItem
        label="Forgot Password"
        onPress={() => navigation.navigate("ForgetPage")}
      />
      <DrawerItem
        label="Home Page"
        onPress={() => navigation.navigate("HomePage")}
      />
      <DrawerItem
        label="ADT Marking Page"
        onPress={() => navigation.navigate("ADTPage")}
      />
      <DrawerItem
        label="Customer Marking Page"
        onPress={() => navigation.navigate("CustomerPage")}
      />
      <DrawerItem
        label="ADT Mark Details"
        onPress={() => navigation.navigate("AdtDetail")}
      />
      <DrawerItem
        label="Customer Mark Details"
        onPress={() => navigation.navigate("CustomerDetail")}
      />

      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

// Assigne Drawer Navigation to Same Tab Navigation
function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Tab.Screen
        name="MainTabScreen"
        component={MainTabScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

// Combination of Stack and Drawer Navigation

function MainNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninPage"
          component={SigninPage}
          options={{ title: "Signin Page", headerShown: false }}
        />
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ title: "Signup Page", headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPage"
          component={ForgetPage}
          options={{ title: "Forgot Password Page", headerShown: false }}
        />
        <Drawer.Screen
          name="HomePage"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { MainNav };
