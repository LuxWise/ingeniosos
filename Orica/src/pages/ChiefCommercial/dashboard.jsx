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
  const [quoteCompleteNumber, setQuoteCompleteNumber] = React.useState("");
  const [quoteCompleteDate, setQuoteCompleteDate] = React.useState("");
  const [quoteCompleteStatus, setQuoteCompleteStatus] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/user`)
      .then(res => {
        dispatch(setName(res.data));
      })
      .catch(res => console.log());

    axiosInstance
      .get(`${URL}/quoteCommercial/all`)
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
      .get(`${URL}/quotesCommecial/new/all`)
      .then(res => {
        setOpenQuotes(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/totalQuotesCommercial/all`)
      .then(res => {
        setTotalQuote(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotePendingCommercial`)
      .then(res => {
        console.log();
        setPending(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotes/day/all`)
      .then(res => {
        setQuoteDate(res.data);
      })
      .catch(res => console.log);

    axiosInstance
      .get(`${URL}/quotesCommecial/complete`)
      .then(res => {
        const last = res.data.length - 1;
        setQuoteCompleteNumber(res.data[last].id);
        setQuoteCompleteDate(res.data[last].date);
        setQuoteCompleteStatus(res.data[last].status);
      })
      .catch(res => console.log);
  }, [dispatch]);

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          ¡Welcome, {user.name}!
        </span>
      </div>

      <section className="flex flex-col xl:flex-row justify-between w-full h-[90%] pt-5 gap-16">
        <div className="flex flex-col w-full h-full gap-5">
          <modul.ModuleWlg
            title="New quotations"
            type="Quotation"
            date={lastQuoteDate}
            status={lastQuoteStatus}
            number={lastQuoteNumber}
          />
          <modul.ModuleWlg title="Quotes complete" type="Quotation" number="" />

          <div className="flex flex-col">
            <div className="grid grid-cols-3 max-md:grid-cols-2 w-full h-full gap-3">
              <modul.ModuleColor value={openQuotes} text="New quotations" />
              <modul.ModuleColor value={totalQuote} text="Total quotations" />
              <modul.ModuleColor value={quoteDate} text="Today's quotations" />
            </div>
          </div>
        </div>
        <div className="hidden w-5/12 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHlg type="Quote" number={pending} full={true} />
        </div>
      </section>
    </Desk>
  );
};

export default Dashboard;
