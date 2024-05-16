import Desk from "@/layout/desk";
import React, { use } from "react";
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
  const [openQuotes, setOpenQuotes] = React.useState("");
  const [totalQuote, setTotalQuote] = React.useState("");
  const [pending, setPending] = React.useState("");
  const [quoteDate, setQuoteDate] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/user`)
      .then(res => {
        dispatch(setName(res.data));
      })
      .catch(res => console.log());

    axiosInstance
      .get(`${URL}/quoteCommercial`)
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
      .get(`${URL}/quotesCommecial/new`)
      .then(res => {
        setOpenQuotes(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/totalQuotesCommercial`)
      .then(res => {
        setTotalQuote(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotePendingCommercial/1`)
      .then(res => {
        console.log();
        setPending(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotes/day`)
      .then(res => {
        setQuoteDate(res.data);
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
            text="View new Quote"
            onSubmit={() => router.push("/Commercial/review")}
          />
          <button.ButtonHistory
            text="History"
            onSubmit={() => router.push("/Commercial/quotations")}
          />
        </div>
      </div>

      <section className="flex flex-col xl:flex-row justify-between w-full pt-5 gap-16">
        <div className="flex flex-col w-full h-full gap-5">
          <modul.ModuleWlg
            title="New quotations"
            type="Quotation"
            date={lastQuoteDate}
            status={lastQuoteStatus}
            number={lastQuoteNumber}
          />
          <div className="flex flex-col">
            <div className="grid grid-cols-3 max-md:grid-cols-2 w-full h-full gap-3">
              <modul.ModuleColor value={openQuotes} text="New quotations" />
              <modul.ModuleColor value={totalQuote} text="Total quotations" />
              <modul.ModuleColor value={quoteDate} text="Today's quotations" />
            </div>
          </div>

          <modul.ModuleWlg title="Shipment status" type="Shipping" number="" />
        </div>
        <div className="hidden w-2/6 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHlg type="Quote" number={pending} />
          <modul.ModuleHmd type="Custumers" number="" />
        </div>
      </section>
    </Desk>
  );
};

export default Dashboard;
