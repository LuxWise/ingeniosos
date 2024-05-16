import React from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../AppRedux/slices/authSlice";
import { setClear } from "../../AppRedux/slices/shipSlice";

interface RootState {
  isModalOpen: boolean;
  setIsModalOpen: any;
}
interface RootState {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
}

export function Settings({ isModalOpen, setIsModalOpen }: RootState) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setLogout());
    dispatch(setClear());
  };

  return (
    <Modal visible={isModalOpen} style={{ justifyContent: "space-around" }}>
      <View>
        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={() => setIsModalOpen(false)}>
              <Text
                style={{ fontSize: 30, color: "#0099cc", fontFamily: "Mukta" }}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            source={{ uri: "https://orica.ingeniososweb.com/img/user.png" }}
            style={styles.image}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20, gap: 10 }}>
          <Text style={{ fontSize: 22, fontFamily: "Mukta" }}>{user.name}</Text>
          <Text style={{ fontSize: 16, fontFamily: "Mukta", marginTop: 5 }}>
            {user.email}
          </Text>
        </View>
      </View>

      <Pressable style={styles.pressableLogout} onPress={onSubmit}>
        <Text style={styles.logout}>logout</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "flex-end",
    ...Platform.select({
      ios: {
        marginTop: 80,
        marginHorizontal: 40,
      },
      android: {
        marginTop: 50,
        marginHorizontal: 30,
      },
    }),
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 30,

    ...Platform.select({
      ios: {
        marginRight: 85,
      },
      android: {
        marginRight: 75,
      },
    }),
  },
  image: {
    width: 180,
    height: 180,
    margin: 0,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#a8c5cd",
  },
  pressableLogout: {
    alignItems: "center",

    ...Platform.select({
      ios: {
        marginTop: "85%",
      },
      android: {
        marginTop: "80%",
      },
    }),
  },
  logout: {
    fontSize: 22,
    fontFamily: "Mukta",
  },
});
