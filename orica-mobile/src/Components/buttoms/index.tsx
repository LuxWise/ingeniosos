import React from "react";
import axios from "axios";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { URL } from "../../constants";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

interface CustomButtom {
  title: string;
}
interface CustomButtomShip {
  title: string;
  action: any;
}

interface CustomButtomLogin {
  title: string;
  username: string;
  password: string;
  action: any;
}

export const CustomButtom: React.FC<CustomButtom> = ({ title }) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.customButtom}
        onPress={() => console.log("sip")}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CustomButtomShip: React.FC<CustomButtomShip> = ({
  title,
  action,
}) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity style={styles.customButtom} onPress={action}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CustomButtomLogin: React.FC<CustomButtomLogin> = ({
  title,
  username,
  password,
  action,
}) => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    axios
      .post(`${URL}/auth/login`, {
        username: username.toLowerCase(),
        password: password,
      })
      .then(response => {
        AsyncStorage.setItem("token", response.data.token);
        const token = response.data.token;
        dispatch(action(jwtDecode(token.toString())));
      })

      .catch(err => console.log(err));
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity style={styles.customButtomLogin} onPress={onSubmit}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButtom: {
    paddingHorizontal: 25,
    backgroundColor: "#0099cc",
    borderRadius: 25,
    marginTop: 10,

    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 7,
      },
    }),
  },
  customButtomLogin: {
    paddingHorizontal: 60,
    backgroundColor: "#0099cc",
    borderRadius: 22,

    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 5,
      },
    }),
  },
  title: {
    fontFamily: "Mukta",
    color: "#fff",
    fontSize: 20,
  },
});
