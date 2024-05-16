import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setStatement } from "../../AppRedux/slices/statementSlice";

interface CustomInput {
  title: string;
  setValue: any;
  action: any;
}

interface CustomInputProps {
  title: string;
  setValue: any;
  secureText: boolean;
}

export const CustomInput: React.FC<CustomInput> = ({ title, setValue }) => {
  const dispatch = useDispatch();

  const handleChangeText = (text: string) => {
    dispatch(setValue(text));
  };
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.titleModule}>{title}</Text>
      <View style={styles.customInput}>
        <TextInput style={styles.input} onChangeText={handleChangeText} />
      </View>
    </View>
  );
};

export const CustomInputLogin: React.FC<CustomInputProps> = ({
  title,
  setValue,
  secureText,
}) => {
  const dispatch = useDispatch();

  const handleChangeText = (text: string) => {
    dispatch(setValue(text));
  };
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.titleModule}>{title}</Text>
      <View style={styles.customInputLog}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          secureTextEntry={secureText}
        />
      </View>
    </View>
  );
};

export const CustomInputStatement: React.FC<CustomInput> = ({
  title,
  setValue,
  action,
}) => {
  const dispatch = useDispatch();

  const handleChangeText = (text: string) => {
    dispatch(setValue(text));
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.titleModule}>{title}</Text>
      <View style={styles.customInput}>
        <TextInput style={styles.input} onChangeText={handleChangeText} />
      </View>
      <TouchableOpacity onPress={action} style={styles.customButtomLogin}>
        <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Mukta" }}>
          submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customInput: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 10,
    paddingHorizontal: 15,

    ...Platform.select({
      ios: {
        paddingVertical: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        paddingVertical: 6,
        elevation: 4,
      },
    }),
  },
  customInputLog: {
    width: "85%",
    backgroundColor: "#c6dfe7",
    borderRadius: 16,
    marginVertical: 5,
    paddingHorizontal: 15,

    ...Platform.select({
      ios: {
        paddingVertical: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        paddingVertical: 6,
        elevation: 4,
      },
    }),
  },
  title: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 22,
  },
  titleModule: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 22,
    marginRight: 160,
  },
  input: {
    color: "#080808",
    fontSize: 16,
  },
  customButtomLogin: {
    marginVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#0099cc",
    borderRadius: 25,

    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 5,
      },
    }),
  },
});
