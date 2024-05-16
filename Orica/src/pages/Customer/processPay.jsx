import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import Image from "next/image";
import quoteForm from "@/assets/Quote.png";
import { useSelector, useDispatch } from "react-redux";
import { button } from "@/components/button";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { change } from "@/redux/features/authSlice.js";

const ProcessPay = () => {
  const quote = useSelector(state => state.preview.quoteNumber);
  const proforma = useSelector(state => state.proforma);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.get(
        `${URL}/proformaPdf/download/proforma/${quote}`,
        {
          responseType: "blob",
        }
      );
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

  const onApprove = () => {
    dispatch(change(true));

    axiosInstance
      .post(`${URL}/reSendProforma`, {
        email: proforma.email,
      })
      .then(res => {
        dispatch(change(false));
        enqueueSnackbar("proforma send", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
      })
      .catch(() => {
        dispatch(change(false));
      });
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Proforma # {quote}
      </span>
      <section className="flex w-full justify-center mt-6 gap-10">
        <div className="flex flex-col items-center  w-full h-full gap-6">
          <div>
            <Image className="Quote" src={quoteForm} alt="Proforma" />
          </div>
          <button.ButtonSubmit text="Download" onSubmit={onSubmit} />

          <div className="flex px-24 ml-5 gap-5 items-center">
            <span className="font-body text-sm">
              Note: If you need any changes or assistance, please do not
              hesitate to contact us.
            </span>
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default ProcessPay;
