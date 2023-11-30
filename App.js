import { SafeAreaView } from "react-native";
import { MainNav } from "./src/navigation/MainNav";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNav />
    </SafeAreaView>
  );
}