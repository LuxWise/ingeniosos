import Desk from "@/layout/desk";
import Swal from "sweetalert2";
import React, { useState } from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { change } from "@/redux/features/authSlice.js";
import { removeCart } from "@/redux/features/cartSlice";
import {
  addDate,
  addPrice,
  addPort,
  addQuantityDivide,
  removeAllDivide,
  setId,
  setProduct,
  setQuantityDivide,
  updateDivide,
  addDivideSubmit,
} from "@/redux/features/divideSlice";
import { openClose } from "@/redux/features/divideSlice";

const ModifyDivision = () => {
  const data = useSelector(state => state.cart);
  const divide = useSelector(state => state.divide.dividDetails);
  const divideInfo = useSelector(state => state.divide);
  const didvidSubmit = useSelector(state => state.divide.didvidSubmit);
  const find = didvidSubmit.find(item => item[1] === divide.idproduct);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeCart());
    divide == "" || divide == undefined
      ? router.push(`/ChiefCommercial/divisions/`)
      : null;
    // axiosInstance
    //   .get(`${URL}/quote/${quote.quote.id}`)
    //   .then(res => {
    //     setObservations(res.data[0].observations);
    //   })
    //   .catch(res => console.log());
    // axiosInstance
    //   .get(`${URL}/quoteProducts/${quote.quote.id}`)
    //   .then(res => {
    //     setProducts(res.data);
    //     res.data.map(item => {
    //       dispatch(add({ product: item.product, quantity: item.quantity }));
    //     });
    //   })
    //   .catch(res => console.log());
  }, []);

  console.log(divide);

  const onSave = () => {
    event.preventDefault();

    const newQuantity = parseInt(divideInfo.quantityDivide);
    const previousQuantity = parseInt(divide.quantity);
    const quantity = newQuantity - previousQuantity;

    if (quantity < 0) {
      dispatch(setId(divide.idproduct));
      dispatch(setProduct(divide.product));
      dispatch(setQuantityDivide(Math.abs(quantity)));
      Swal.fire({
        text: "It's necessary to have the total quantity of products, please create a new division",
        confirmButtonText: "Create new divide",
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(openClose(true));
          dispatch(
            updateDivide({
              id: divide.id,
              port: divideInfo.port,
              quantity: divideInfo.quantityDivide,
              price: divideInfo.price,
              date: divideInfo.date,
            })
          );
        }
      });
    } else if (quantity > 0) {
      Swal.fire({
        text: "It's necessary change total of products in the quote",
        confirmButtonText: "Modify Quote",
        showDenyButton: true,
        denyButtonText: `Don't save`,
      }).then(result => {
        if (result.isConfirmed) {
          router.push("/ChiefCommercial/quotations/");
        }
      });
    } else {
      if (
        divideInfo.port != "" ||
        divideInfo.quantityDivide != "" ||
        divideInfo.price != "" ||
        divideInfo.date != ""
      ) {
        Swal.fire({
          text: "Do you want to save the changes?",
          showDenyButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then(result => {
          if (result.isConfirmed) {
            dispatch(
              updateDivide({
                id: divide.id,
                port: divideInfo.port,
                quantity: divideInfo.quantityDivide,
                price: divideInfo.price,
                date: divideInfo.date,
              })
            );
            dispatch(addDivideSubmit([divide.id, divide.idproduct]));
          }
        });
      }
    }
  };

  const onSubmit = () => {
    event.preventDefault();

    const newQuantity = parseInt(divideInfo.quantityDivide);
    const previousQuantity = parseInt(divide.quantity);
    const quantity = newQuantity - previousQuantity;

    if (quantity < 0 && find) {
      console.log(divideInfo.didvidSubmit[0]);
      axiosInstance
        .put(`${URL}/divide`, {
          divide: divideInfo.updateDivide,
        })
        .then(res => console.log(res));
      axiosInstance
        .post(`${URL}/divid`, {
          divid: divideInfo.didvidSubmit,
          quote: divide.idquote,
        })
        .then(res => router.push("/SuperAdmin/divisions/"))
        .catch(err => console.log(err));
    } else if (find) {
      axiosInstance
        .put(`${URL}/divide`, {
          divide: divideInfo.updateDivide,
        })
        .then(res => router.push("/SuperAdmin/divisions/"))
        .catch(err => console.log(err));
    } else {
      console.log("nop");
    }
  };

  return (
    <section>
      <Desk>
        <SnackbarProvider />
        <span className="font-semibold font-body text-4xl">
          Modify Division
        </span>
        <section className="flex flex-col items-center gap-5">
          <div className="w-full h-[80%] p-8 mt-10 bg-white shadow-base rounded-lg">
            <span className="text-2xl font-body font-semibold ">
              Divide # {divide.id}
            </span>
            <div className="grid grid-cols-2 mt-2">
              <div className="flex justify-center">
                <span className="text-lg text-gray-600 font-body font-medium ">
                  Product
                </span>
              </div>
              <div className="flex justify-center">
                <span className="text-lg text-gray-600 font-body font-medium ">
                  Quantity of division
                </span>
              </div>
              <div className="flex items-center justify-center gap-5 mr-8">
                <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
                <span className="text-lg font-semibold">{divide.product}</span>
              </div>
              <div className="flex justify-center">
                <span className="text-lg font-semibold">{divide.quantity}</span>
              </div>
            </div>
            <section className="grid grid-cols-2 mt-2 gap-8">
              <div>
                <h2>Port</h2>
                <input.InputSelectDivide
                  urldata="/ports"
                  add={addPort}
                  initialValue={divide.idport}
                />
              </div>
              <div>
                <h2>Quantity</h2>
                <input.InputDivide
                  add={addQuantityDivide}
                  typeofdata={"number"}
                  initialValue={divide.quantity}
                />
              </div>
              <div>
                <h2>Price</h2>
                <input.InputDivide
                  add={addPrice}
                  typeofdata={"number"}
                  initialValue={divide.price}
                />
              </div>
              <div>
                <h2>Date</h2>
                <input.InputDivide
                  add={addDate}
                  typeofdata={"date"}
                  initialValue={divide.date}
                />
              </div>
            </section>
            <div className="flex items-center justify-center mt-10">
              {find ? (
                <button.ButtonCheck text="good" />
              ) : (
                <button.ButtonModuleCommercial text="save" onSubmit={onSave} />
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-end">
            <button.ButtonSubmit text="save modify" onSubmit={onSubmit} />
          </div>
        </section>
      </Desk>
    </section>
  );
};

export default ModifyDivision;
