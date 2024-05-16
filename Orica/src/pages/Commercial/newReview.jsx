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
import { add, addTaxes } from "@/redux/features/reviewSlice";
import { openClose, removeAllDivide } from "@/redux/features/divideSlice";

const NewReview = () => {
  const quote = useSelector(state => state.preview.quoteNumber);
  const loading = useSelector(state => state.auth);
  const quantity = useSelector(state => state.review.cartReview);
  const review = useSelector(state => state.review);
  const didvidSubmit = useSelector(state => state.divide.didvidSubmit);
  const preview = useSelector(state => state.preview.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    let allPricesValid = true;

    quantity.forEach(price => {
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

    if (didvidSubmit.length != preview.length) {
      dispatch(change(false));
      enqueueSnackbar(`⚠️ Divide incomplete`, {
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
          divid: didvidSubmit,
        })
        .then(() => {})
        .catch(dispatch(change(false)));

      axiosInstance
        .post(`${URL}/divid`, {
          divid: didvidSubmit,
          quote: quote,
        })
        .then(res => {
          dispatch(change(false));
          dispatch(removeAllDivide());
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
        .catch(err => console.log(err));
    }
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Review Quote # {quote}
      </span>
      <section className="flex w-full h-96 justify-center mt-6 gap-10">
        <div className="flex flex-col h-full gap-6">
          <modul.ModuleReviewCommercial
            text="Products"
            add={add}
            open={openClose}
          />

          <div className="flex gap-16 items-center ">
            <input.InputPrice text="Taxes:" add={addTaxes} />
            <span className="font-body text-sm">
              Note: Add the value of taxes in decimal format
            </span>
            <button.ButtonSubmit
              text="send for approval"
              onSubmit={onSubmit}
              log={loading.loading}
            />
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default NewReview;
