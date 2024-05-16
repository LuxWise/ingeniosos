import axiosConfig from "../../axiosconfig";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModuleStatemet } from "../../Components/module";
import { useDispatch, useSelector } from "react-redux";
import { setStatementInfo } from "../../AppRedux/slices/statementSlice";
import { Logout } from "../Settings";

interface RootState {
  statement: {
    satetment: boolean;
    statementInfo: {
      glaccount: string;
      billingdocument: string;
      assignment: string;
      documentnumber: string;
      postingdate: string;
      amountindoc: string;
    };
  };
}

export function CustomerStatement() {
  const dispatch = useDispatch();
  const statementInfo = useSelector(
    (state: RootState) => state.statement.statementInfo
  );

  useEffect(() => {
    axiosConfig.get(`/statement?id=29337`).then(response => {
      dispatch(setStatementInfo(response.data[0]));
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <Logout />
      <View style={styles.container}>
        <Text style={styles.title}>Statement of account</Text>
      </View>
      <View style={styles.module}>
        <ModuleStatemet
          title="Account"
          glaccount={statementInfo.glaccount}
          billing={statementInfo.billingdocument}
          assignment={statementInfo.assignment}
          document={statementInfo.documentnumber}
          posting={statementInfo.postingdate}
          amount={statementInfo.amountindoc}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 29,
  },
  module: {
    alignItems: "center",
    marginTop: 10,
  },
  moduleColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 35,
    gap: 5,
  },
});
