import React from "react";
import axiosConfig from "../../axiosconfig";
import { View, Text, StyleSheet, StatusBar, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput } from "../../Components/inputs";
import { CustomButtomShip } from "../../Components/buttoms";
import {
  setSearch,
  setShip,
  setShipInfo,
} from "../../AppRedux/slices/shipSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModuleShip } from "../../Components/module";

export default function ProformaShip() {
  interface RootState {
    ship: {
      ship: boolean;
      search: string;
      shipInfo: any;
    };
  }
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.ship);
  const shipInfo = search.shipInfo[0];
  const onSubmit = () => {
    axiosConfig
      .get(`/shipment?id=${search.search}`)
      .then(response => {
        dispatch(setShipInfo(response.data));
        dispatch(setShip(true));
      })
      .catch(err => dispatch(setShip(false)));
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Shipment</Text>
      </View>
      <View style={styles.module}>
        <CustomInput title={"Ship finder"} setValue={setSearch} />
        <CustomButtomShip title="search" action={onSubmit} />
      </View>
      {search.ship && (
        <ModuleShip
          number={shipInfo.billofladin}
          status={shipInfo.status}
          from={shipInfo.pol}
          to={shipInfo.pod}
        />
      )}
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
    fontSize: 30,
    marginTop: 10,
  },
  module: {
    alignItems: "center",
    marginTop: 20,
  },
});
