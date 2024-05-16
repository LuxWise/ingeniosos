import Desk from "@/layout/desk";
import React from "react";
import boat from "@/assets/boat.png";
import axiosInstance from "@/axiosInstance";
import dynamic from "next/dynamic";
import axios from "axios";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { useRouter } from "next/router";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { IoIosSend } from "react-icons/io";
import { RiFilePdfFill } from "react-icons/ri";
import { useScreenshot } from "use-react-screenshot";
import { openClose } from "@/redux/features/mailSlice";
import { shipNumber } from "@/redux/features/shipmentSlice";

// Asegúrate de que el nombre de tu componente comience con una letra mayúscula
const ShippingDetails = () => {
  const ship = useSelector(state => state.preview.quoteNumber);
  const [data, setData] = React.useState("");
  const [positionFrom, setPositionFrom] = React.useState([0, 0]);
  const [positionTo, setPositionTo] = React.useState([0, 0]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const dispatch = useDispatch();

  const DynamicMapMd = dynamic(() => import("@/components/map"), {
    ssr: false,
  });

  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`${URL}/shipment/${ship}`)
      .then(res => {
        setData(res.data[0]);
        dispatch(shipNumber(res.data[0].billoflading));
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${res.data[0].pol}`
          )
          .then(res => {
            const latitud = res.data[0].lat;
            const longitud = res.data[0].lon;

            setPositionFrom([latitud, longitud]);
          });

        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${
              res.data[0].pod == "BUENAVENTURA, COL"
                ? "BUENAVENTURA, COLOMBIA"
                : res.data[0].pod
            }`
          )
          .then(res => {
            const latitud = res.data[0].lat;
            const longitud = res.data[0].lon;

            setPositionTo([latitud, longitud]);
          });
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [dispatch, ship]); // Added ship to the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onPdf = async () => {
    try {
      const response = await axiosInstance.get(`${URL}/shipPdf`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "nombre-del-archivo.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          Shipment # {data.billoflading}
        </span>
        <div className="flex mr-10">
          <button.ButtonHistory
            text="send mail"
            onSubmit={() => dispatch(openClose(true))}
          />
        </div>
        <div className="flex mr-10">
          <button.ButtonHistory text="print PDF " onSubmit={onPdf} />
        </div>
      </div>

      <div className="flex flex-col w-full h-2/4 mt-5 gap-5">
        <modul.ModuleShipment
          title="Shipment"
          number={data.billoflading}
          source={data.source}
          arrive={data.arrive}
          status={data.status}
          fromSide={data.pol}
          toSide={data.pod}
        />
        <div className="flex w-full h-full gap-5">
          <div className="w-full h-48">
            <modul.ModuleStatusShipment icon={boat} />
          </div>

          <div className="z-0 w-full h-48">
            <DynamicMapMd positionFrom={positionFrom} positionTo={positionTo} />
          </div>
        </div>
      </div>

      <div className="flex w-full mt-5 "></div>
    </Desk>
  );
};

export default ShippingDetails;
