import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance.js";
import { button } from "../../components/button/index.jsx";
import { modul } from "@/components/modul";
import { useRouter } from "next/router.js";
import { URL } from "@/constans/constans.js";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/redux/features/userSlice.js";
import { removeAll } from "@/redux/features/cartSlice.js";

const Dashboard = () => {
  const user = useSelector(state => state.user.name);
  const [lastQuoteNumber, setLastQuoteNumber] = React.useState("");
  const [lastQuoteDate, setLastQuoteDate] = React.useState("");
  const [lastQuoteStatus, setLastQuoteStatus] = React.useState("");
  const [totalQuote, setTotalQuote] = React.useState("");
  const [pending, setPending] = React.useState("");
  const [request, setRequest] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeAll());
    axiosInstance
      .get(`${URL}/user`)
      .then(res => {
        dispatch(setName(res.data));
      })
      .catch(err => console.log(err));

    axiosInstance
      .get(`${URL}/quote`)
      .then(res => {
        const last = res.data.length - 1;
        setLastQuoteNumber(res.data[last].id);
        setLastQuoteDate(res.data[last].date);
        setLastQuoteStatus(res.data[last].status);
      })
      .catch(res => {
        console.log;
      });

    axiosInstance
      .get(`${URL}/totalQuotes`)
      .then(res => {
        setTotalQuote(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotePending/1`)
      .then(res => {
        console.log();
        setPending(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/requests`)
      .then(res => {
        setRequest(res.data);
      })
      .catch(res => console.log);
  }, [dispatch]);

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          ¡Welcome, {user.name}!
        </span>
        <div className="flex gap-5">
          <button.ButtonQuotations
            text="New Quote"
            onSubmit={() => router.push("/Customer/newQuote")}
          />
          <button.ButtonHistory
            text="Approval"
            onSubmit={() => router.push("/Customer/approval")}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between w-full pt-5 gap-16">
        <div className="flex flex-col w-full h-full gap-5">
          <modul.ModuleWlg
            title="Last quotations"
            type="Quotation"
            date={lastQuoteDate}
            status={lastQuoteStatus}
            number={lastQuoteNumber}
          />
          <div className="flex  flex-col">
            <div className="flex gap-4">
              <div className="w-2/6 max-md:w-full">
                <modul.ModuleColor
                  type="Quotations"
                  value={totalQuote}
                  text="Quotations send"
                />
              </div>
              <div className="w-4/6 max-md:hidden">
                <modul.ModuleWmd
                  title="Finalized quotations"
                  type="Quotation"
                  number=""
                />
              </div>
            </div>
          </div>

          <modul.ModuleWlg title="Shipment status" type="Shipping" number="" />
        </div>
        <div className="hidden w-2/6 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHlg type="Quote" number={pending} />
          <modul.ModuleHmd type="Request" number={request} />
        </div>
      </div>
    </Desk>
  );
};

export default Dashboard;
