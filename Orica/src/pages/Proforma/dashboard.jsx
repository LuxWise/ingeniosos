import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance.js";
import { button } from "../../components/button/index.jsx";
import { modul } from "@/components/modul";
import { useRouter } from "next/router.js";
import { URL } from "@/constans/constans.js";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/redux/features/userSlice.js";

const Dashboard = () => {
  const user = useSelector(state => state.user.name);
  const [lastQuoteNumber, setLastQuoteNumber] = React.useState("");
  const [lastQuoteDate, setLastQuoteDate] = React.useState("");
  const [lastQuoteStatus, setLastQuoteStatus] = React.useState("");
  const [totalQuote, setTotalQuote] = React.useState("");
  const [proformas, setProformas] = React.useState("");
  const [pending, setPending] = React.useState("");
  const [lastRequest, setLastRequest] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    Promise.all([
      axiosInstance.get(`${URL}/user`).then(response => {
        dispatch(setName(response.data));
      }),
      axiosInstance.get(`${URL}/quoteProforma`).then(res => {
        const last = res.data.length - 1;
        setLastQuoteNumber(res.data[last].id);
        setLastQuoteDate(res.data[last].date);
        setLastQuoteStatus(res.data[last].status);
      }),
      axiosInstance.get(`${URL}/quotesApprove`).then(res => {
        console.log();
        setTotalQuote(res.data);
      }),
      axiosInstance.get(`${URL}/totalProforma`).then(res => {
        console.log();
        setProformas(res.data);
      }),
      axiosInstance.get(`${URL}/quotePendingApprove`).then(res => {
        setPending(res.data);
      }),
      axiosInstance.get(`${URL}/requests`).then(res => {
        setLastRequest(res.data);
      }),
    ])
      .then(() => {})
      .catch(error => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          ¡Welcome, {user.name}!
        </span>
        <div className="flex mr-10">
          <button.ButtonHistory
            text="Create new proforma"
            onSubmit={() => router.push("/Proforma/previewQuote")}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between w-full pt-5 gap-16">
        <div className="flex flex-col w-full h-full gap-5">
          <modul.ModuleWlg
            title="Last quote approve"
            type="Quotation"
            date={lastQuoteDate}
            status={lastQuoteStatus}
            number={lastQuoteNumber}
          />
          <div className="flex flex-col">
            <span className="font-body font-semibold ml-4">Proforma</span>
            <div className="grid grid-cols-2 gap-5 w-full h-full">
              <modul.ModuleColor value={totalQuote} text="Quotations approve" />
              <modul.ModuleColor value={proformas} text="proformas created" />
            </div>
          </div>
        </div>
        <div className="hidden w-2/6 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHlg type="quote" number={pending} />
          <modul.ModuleHmd type="Request" number={lastRequest} />
        </div>
      </div>
    </Desk>
  );
};

export default Dashboard;
