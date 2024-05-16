import axiosConfig from "../../axiosconfig";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModuleStatemet } from "../../Components/module";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatement,
  setStatementInfo,
  setStatementSearch,
} from "../../AppRedux/slices/statementSlice";
import { CustomInputStatement } from "../../Components/inputs";
import { Logout } from "../Settings";

interface RootState {
  statement: {
    satetment: boolean;
    statementNumber?: string;
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

export function CommercialStatement() {
  const dispatch = useDispatch();
  const statement = useSelector((state: RootState) => state.statement);
  const statementInfo = useSelector(
    (state: RootState) => state.statement.statementInfo
  );

  const onSubmit = () => {
    axiosConfig
      .get(`/statement?id=${statement.statementNumber}`)
      .then(response => {
        dispatch(setStatementInfo(response.data[0]));
        dispatch(setStatement(true));
      })
      .catch(res => {
        dispatch(setStatement(false));
      });
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Logout />

        <StatusBar />
        <View style={styles.container}>
          <Text style={styles.title}>Statement of account</Text>
        </View>
        <View style={styles.moduleFind}>
          <CustomInputStatement
            title={"Find"}
            setValue={setStatementSearch}
            action={onSubmit}
          />
        </View>
        {statement.satetment && (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 29,
    marginTop: 10,
  },
  module: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 80,
  },
  moduleColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 35,
    gap: 5,
  },
  moduleFind: {
    flex: 1,
  },
});
