import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { URL } from "@/constans/constans";
import { useRouter } from "next/router";
import { change } from "@/redux/features/authSlice.js";
import {
  addSubject,
  addType,
  addDescription,
} from "@/redux/features/supportSlice";

const NewRequestCommercial = () => {
  const supportFrom = useSelector(state => state.support);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));

    axiosInstance
      .post(`${URL}/sendSupport`, {
        subjectSupport: supportFrom.subject,
        type: supportFrom.type,
        description: supportFrom.description,
        supportType: 1,
        supportStatus: 1,
      })
      .then(res => {
        dispatch(change(false));
        enqueueSnackbar("your case was created", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        setTimeout(() => {
          router.push("/Customer/support/");
        }, 2000);
      })
      .catch(res => {
        dispatch(change(false));
        console.log(res);
      });
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">New Request</span>
      <section className="flex justify-center w-full mt-10 gap-10">
        <div className="flex flex-col gap-8 h-full w-full items-center">
          <input.InputQuoteLg text="Subject" add={addSubject} />
          <input.InputQuoteXl text="Description" add={addDescription} />
        </div>
        <div className="flex flex-col gap-8 h-full w-full">
          <input.InputSelectLg
            text="Type"
            add={addType}
            urldata="support/type/list"
          />
          <div className="flex h-full items-center justify-center">
            <button.ButtonSubmit
              text="Sent Request"
              onSubmit={onSubmit}
              log={loading.loading}
            />
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default NewRequestCommercial;
