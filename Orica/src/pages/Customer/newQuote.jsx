import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import Swal from "sweetalert2";
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
  addProduct,
  addQuantity,
  addName,
  addPort,
  addPhone,
  addObservations,
  addCommercial,
  removeCart,
  deleteItemCart,
  removeAll,
} from "@/redux/features/cartSlice";

import { sendGAEvent } from "@next/third-parties/google";

const NewQuote = () => {
  const cart = useSelector(state => state.cart.cart);
  const data = useSelector(state => state.cart);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = () => {
    sendGAEvent({ event: "buttonClicked", value: "try created a new quote" });
    event.preventDefault();
    dispatch(change(true));
    const now = new Date();
    let allPricesValid = true;
    if (
      data.name == "" ||
      data.port == "" ||
      data.phone == "" ||
      data.commercial == ""
    ) {
      dispatch(change(false));
      enqueueSnackbar(`⚠️ There are empty fields`, {
        autoHideDuration: 2000,
        style: {
          backgroundColor: "#024f72",
          fontWeight: "500",
          borderRadius: "7px",
        },
      });
      allPricesValid = false;
    }

    if (data.cart.length <= 0) {
      dispatch(change(false));
      enqueueSnackbar(`⚠️ There are empty fields`, {
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
        .post(`${URL}/sendQuote`, {
          name: data.name,
          port: data.port,
          phone: data.phone,
          observations: data.observations,
          products: cart,
          commercial: data.commercial,
          date: now,
        })
        .then(res => {
          if (res.data.Message === "exits") {
            dispatch(change(false));
            Swal.fire("Error", "Quote exits", "error");
          } else {
            dispatch(change(false));
            enqueueSnackbar("quote send", {
              autoHideDuration: 2000,
              style: {
                backgroundColor: "#028bca",
                fontWeight: "500",
                borderRadius: "7px",
              },
            });
            setTimeout(() => {
              router.push("/Customer/quotations/");
            }, 1000);
            dispatch(removeCart());
            dispatch(removeAll());
          }
        })
        .catch(res => {
          dispatch(change(false));
        });
    }
  };

  const onAdd = () => {
    dispatch(add({ product: data.product, quantity: data.quantity }));
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">New Quote</span>
      <section className="flex justify-center w-11/12 mt-6 ml-8 gap-10">
        <div className="flex flex-col items-center gap-8 h-full w-full">
          <input.InputSelectLgValue
            text="Commercial"
            urldata="Commercial/list"
            add={addCommercial}
            lastname={true}
          />
          <input.InputQuoteLg text="Full name Customer" add={addName} />
          <input.InputQuoteLg text="Phone" add={addPhone} />
          <input.InputQuoteXl text="Observations" add={addObservations} />
          <button.ButtonSubmit
            text="Sent Quote"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
        <div className="flex flex-col gap-8 h-full w-full">
          <input.InputSelectLgPort text="Port" add={addPort} urldata="/ports" />
          <div className="flex w-full gap-5 items-end justify-start">
            <input.InputSelectMd
              text="Product"
              urldata="products/list"
              add={addProduct}
            />
            <input.InputQuantity text="Quantity" add={addQuantity} />
            <button.ButtonAdd text="Add" onSubmit={onAdd} />
          </div>

          <modul.ModuleCart remove={deleteItemCart} />
        </div>
      </section>
    </Desk>
  );
};

export default NewQuote;
