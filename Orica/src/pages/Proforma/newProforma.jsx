import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { modul } from "@/components/modul";
import { change } from "@/redux/features/authSlice.js";
import {
  add,
  addPaganName,
  addPaganLastName,
  addBank,
  addTaxes,
  addAccountNumber,
} from "@/redux/features/proformaSlice";

const NewProforma = () => {
  const preview = useSelector(state => state.preview.cart);
  const quote = useSelector(state => state.preview.quoteNumber);
  const loading = useSelector(state => state.auth);
  const taxes = useSelector(state => state.proforma);
  const proforma = useSelector(state => state.proforma);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));

    axiosInstance
      .post(`${URL}/sendProforma`, {
        quote: quote,
        paganName: proforma.paganName,
        PaganLastName: proforma.paganLastName,
        bank: proforma.bank,
        accountNumber: proforma.accountNumber,
        taxes: proforma.taxes,
        products: proforma.cartProforma,
      })
      .then(res => {
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
          router.push("/Proforma/viewProforma");
        }, 1000);
      })
      .catch(() => {
        dispatch(change(false));
      });
  };

  console.log(preview);

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Proforma by Quote # {quote}
      </span>
      <section className="flex justify-center w-full mt-6 gap-10">
        <div className="flex flex-col w-6/12 h-full gap-6">
          <modul.ModuleProforma text="Products" add={add} preview={preview} />
          <div className="flex flex-col pl-5 gap-5 items-start">
            <div className="flex gap-4 items-center w-full">
              <input.InputPrice
                text="Taxes:"
                add={addTaxes}
                priceBase={taxes.taxes}
              />
              <span className="font-body text-sm">
                Note: Add the value of taxes in decimal format
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-6/12 items-center gap-5">
          <input.InputQuoteLg text="Pagan Name" add={addPaganName} />
          <input.InputQuoteLg text="Pagan Lastname" add={addPaganLastName} />
          <input.InputQuoteLg text="Bank" add={addBank} />
          <input.InputQuoteLg text="Account Number" add={addAccountNumber} />

          <button.ButtonSubmit
            text="Create proforma"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
      </section>
    </Desk>
  );
};

export default NewProforma;
