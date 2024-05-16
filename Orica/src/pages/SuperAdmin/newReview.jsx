import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { change } from "@/redux/features/authSlice.js";
import {
  add,
  addTaxes,
  addChanges,
  addComments,
} from "@/redux/features/reviewSlice";

const NewReview = () => {
  const quote = useSelector(state => state.preview.quoteNumber);
  const loading = useSelector(state => state.auth);
  const quantity = useSelector(state => state.review.cartReview);
  const review = useSelector(state => state.review);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    let allPricesValid = true;

    quantity.forEach(price => {
      if (price.price == "" || price.price == "0") {
        dispatch(change(false));
        enqueueSnackbar(`⚠️ ${price.product} Priceless`, {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#024f72",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        allPricesValid = false;
      }
      if (price.quantity == "" || price.quantity == "0") {
        dispatch(change(false));
        enqueueSnackbar(`⚠️ ${price.product} Quantity`, {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#024f72",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        allPricesValid = false;
      }
    });
    if (review.taxes == "" || review.taxes == "0") {
      dispatch(change(false));
      enqueueSnackbar(`⚠️ Taxes`, {
        autoHideDuration: 2000,
        style: {
          backgroundColor: "#024f72",
          fontWeight: "500",
          borderRadius: "7px",
        },
      });
      allPricesValid = false;
    }

    if (allPricesValid) {
      axiosInstance
        .post(`${URL}/sendQuoteReview`, {
          products: review.cartReview,
          taxes: review.taxes,
          quote: quote,
        })
        .then(() => {
          dispatch(change(false));
          enqueueSnackbar("submitted for approval", {
            autoHideDuration: 2000,
            style: {
              backgroundColor: "#028bca",
              fontWeight: "500",
              borderRadius: "7px",
            },
          });
          setTimeout(() => {
            router.push("/Commercial/quotations/");
          }, 1000);
        })
        .catch(dispatch(change(false)));
    }
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Review Quote # {quote}
      </span>
      <section className="flex w-full justify-center mt-6 gap-10">
        <div className="flex flex-col w-6/12 items-center gap-5">
          <input.InputQuoteLg text="Changes" add={addChanges} />
          <input.InputQuote2Xl text="Comments" add={addComments} />
          <button.ButtonSubmit
            text="send for approval"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
        <div className="flex flex-col w-6/12 h-full gap-6">
          <modul.ModuleReview text="Products" add={add} />
          <div className="flex pl-5 gap-5 items-center">
            <input.InputPrice text="Taxes:" add={addTaxes} />
            <span className="font-body text-sm">
              Note: Add the value of taxes in decimal format
            </span>
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default NewReview;
