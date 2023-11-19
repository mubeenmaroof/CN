import { SafeAreaView } from "react-native";
import { NavContainer } from "./src/navigation/NavContainer";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavContainer />
    </SafeAreaView>
  );
}