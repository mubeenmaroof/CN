import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { modifiers, colors } from "../utils/theme";

function CusButton({
  title = "title",
  onButtonPress,
  bgColor = colors.primary,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onButtonPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

export { CusButton };

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: modifiers.itemMargin,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
  },
});
