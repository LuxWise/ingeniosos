import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import { Settings } from "./Settings";
import { useState } from "react";

export const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => setIsModalOpen(true)}
      >
        <Image
          source={{ uri: "https://orica.ingeniososweb.com/img/user.png" }}
          style={styles.image}
        />
      </TouchableOpacity>

      <Settings isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,

    ...Platform.select({
      ios: {
        marginTop: 12,
      },
      android: {
        marginTop: 25,
      },
    }),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#a8c5cd",
    marginLeft: 20,
  },
});
