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
  addProduct,
  addQuantity,
  addName,
  addPort,
  addPhone,
  addObservations,
  addCommercial,
  removeCart,
} from "@/redux/features/cartSlice";
import { IoIosArrowBack as Back } from "react-icons/io";

const ModifyQuote = () => {
  const cart = useSelector(state => state.cart.cart);
  const data = useSelector(state => state.cart);
  const quote = useSelector(state => state.quote);
  const loading = useSelector(state => state.auth);
  const [observations, setObservations] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeCart());
    quote.quote == "" || quote.quote == undefined
      ? router.push(`/SuperAdmin/quotations/`)
      : null;
    axiosInstance
      .get(`${URL}/quote/${quote.quote.id}`)
      .then(res => {
        setObservations(res.data[0].observations);
      })
      .catch(res => console.log());
    axiosInstance
      .get(`${URL}/quoteProducts/${quote.quote.id}`)
      .then(res => {
        setProducts(res.data);
        res.data.map(item => {
          dispatch(add({ product: item.product, quantity: item.quantity }));
        });
      })
      .catch(res => console.log());
  }, []);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    const now = new Date();
    let allPricesValid = true;

    console.log(data);

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
    // if (allPricesValid) {
    //   axiosInstance
    //     .post(`${URL}/sendQuote`, {
    //       name: data.name,
    //       port: data.port,
    //       phone: data.phone,
    //       observations: data.observations,
    //       products: cart,
    //       commercial: data.commercial,
    //       date: now,
    //     })
    //     .then(res => {
    //       if (res.data.Message === "exits") {
    //         dispatch(change(false));
    //         enqueueSnackbar("quote exits", {
    //           autoHideDuration: 2000,
    //           style: {
    //             backgroundColor: "#028bca",
    //             fontWeight: "500",
    //             borderRadius: "7px",
    //           },
    //         });
    //       } else {
    //         dispatch(change(false));
    //         enqueueSnackbar("quote send", {
    //           autoHideDuration: 2000,
    //           style: {
    //             backgroundColor: "#028bca",
    //             fontWeight: "500",
    //             borderRadius: "7px",
    //           },
    //         });
    //         setTimeout(() => {
    //           router.push("/Customer/quotations/");
    //         }, 1000);
    //         dispatch(removeCart());
    //       }
    //     })
    //     .catch(res => {
    //       dispatch(change(false));
    //     });
    // }
  };

  return (
    <Desk>
      <SnackbarProvider />

      <div className="flex items-center gap-10  ">
        <Back
          className="cursor-pointer"
          size={25}
          onClick={() => router.push("/SuperAdmin/quotations/")}
        />
        <span className="font-semibold font-body text-4xl">
          Modify Quote # {quote.quote.id}
        </span>
      </div>

      <section className="flex justify-center w-full mt-6 gap-10">
        <div className="flex flex-col items-center gap-8 h-full w-full">
          <input.InputSelectLgValue
            text="Commercial"
            urldata="Commercial/list"
            add={addCommercial}
            lastname={true}
            initialValue={quote.quote.idcommercial}
          />
          <input.InputQuoteLg
            text="Full name Customer"
            add={addName}
            value={quote.quote.name}
          />
          <input.InputQuoteLg
            text="Phone"
            add={addPhone}
            value={quote.quote.phone}
          />
          <input.InputQuoteXl
            text="Observations"
            add={addObservations}
            value={observations}
          />
          <button.ButtonSubmit
            text="Change Quote"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
        <div className="flex flex-col gap-8 h-full w-full">
          <input.InputSelectLgPort
            text="Port"
            add={addPort}
            urldata="/ports"
            initialValue={quote.quote.portid}
          />

          <modul.ModuleModifyQuote
            text="Products"
            preview={products}
            quantity={add}
          />
        </div>
      </section>
    </Desk>
  );
};

export default ModifyQuote;
