import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import Image from "next/image";
import quoteForm from "@/assets/Quote.png";
import { useSelector, useDispatch } from "react-redux";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { addComments } from "@/redux/features/reviewSlice";
import { useRouter } from "next/router";
import { change } from "@/redux/features/authSlice.js";

const NewProcess = () => {
  const quote = useSelector(state => state.preview.quoteNumber);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.get(
        `${URL}/quotePdf/download/${quote}`,
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
      .post(`${URL}/sendApprovalQuote`, {
        quote: quote,
      })
      .then(() => {
        dispatch(change(false));
        enqueueSnackbar("quote approve", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        setTimeout(() => {
          router.push("/Customer/quotations");
        }, 1000);
      })
      .catch(dispatch(change(false)));
  };

  const onRequestChange = () => {
    enqueueSnackbar("quote change", {
      autoHideDuration: 2000,
      style: {
        backgroundColor: "#024f72",
        fontWeight: "500",
        borderRadius: "7px",
      },
    });
    setTimeout(() => {
      router.push("/Customer/quotations");
    }, 1000);
  };

  const onDetails = () => {
    setTimeout(() => {
      router.push("/Customer/dateilsQuote");
    }, 1000);
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Approval Quote # {quote}
      </span>
      <section className="flex w-full justify-center mt-5 gap-10">
        <div className="flex flex-col w-full h-full items-center gap-10">
          <input.InputQuoteXl text="Comments" add={addComments} />
          <div className="flex flex-col gap-5">
            <button.ButtonSubmit
              text="Approve"
              onSubmit={onApprove}
              log={loading.loading}
            />
            <button.ButtonSubmit
              text="Request a change"
              onSubmit={onRequestChange}
            />
          </div>
          <div className="w-full h-32">
            <modul.ModuleWmd type="Quotation" number={quote} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full h-full gap-6">
          <div>
            <Image className="Quote" src={quoteForm} alt="quote" />
          </div>
          <button.ButtonSubmit text="Download" onSubmit={onSubmit} />
          <button.ButtonQuotations text="Detatils" onSubmit={onDetails} />

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

export default NewProcess;
