import React from "react";
import Desk from "@/layout/desk";
import axiosInstance from "@/axiosInstance";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { useSelector, useDispatch } from "react-redux";
import { removeQuote } from "@/redux/features/quoteSlice.js";
import { setNumber } from "@/redux/features/previewSlice";
import { URL } from "@/constans/constans";
import { input } from "@/components/input";
import { change } from "@/redux/features/authSlice.js";
import { useRouter } from "next/router";
import { searchShip, ShipNumber } from "@/redux/features/shipmentSlice";

const SubirArchivos = () => {
  const [data, setData] = React.useState("");
  const loading = useSelector(state => state.auth);
  const quote = useSelector(state => state.quote);
  const ship = useSelector(state => state.ship.search);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeQuote());
  }, []);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    axiosInstance
      .get(`${URL}/shipment/search/${ship}`)
      .then(res => {
        setData(res.data);
        dispatch(setNumber(res.data[0].id));
        dispatch(ShipNumber(res.data[0]));
      })
      .catch(err => console.log(err));
    dispatch(change(false));
  };

  const onDetails = () => {
    event.preventDefault();
    dispatch(change(true));
    router.push(`/Customer/shippingDetails/`);
    dispatch(change(false));
  };

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">Shipment </span>
      </div>
      <section className="flex flex-col justify-center w-full mt-5 gap-10">
        <div className="flex items-end gap-10">
          <input.InputQuoteLg add={searchShip} text={"Ship finder"} />
          <button.ButtonSubmit
            text="Search"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
        <div className="h-64 w-full">
          <modul.ModuleSearchShipment data={data} />
        </div>
        <div className="flex w-full items-center justify-center">
          {data == "" ? (
            <></>
          ) : (
            <button.ButtonSubmit
              text="Process"
              onSubmit={onDetails}
              log={loading.loading}
            />
          )}
        </div>
      </section>
    </Desk>
  );
};

export default SubirArchivos;
