import Desk from "@/layout/desk";
import React, { use } from "react";
import axiosInstance from "@/axiosInstance.js";
import { button } from "../../components/button/index.jsx";
import { modul } from "@/components/modul";
import { useRouter } from "next/router.js";
import { URL } from "@/constans/constans.js";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/redux/features/userSlice.js";
import { RiChatVoiceFill as Chat } from "react-icons/ri";
import { openClose } from "@/redux/features/chatSlice.js";

const Dashboard = () => {
  const user = useSelector(state => state.user.name);
  const [commercialPending, setCommercialPending] = React.useState("");
  const [quotesPending, setQuotesPending] = React.useState("");
  const [newQuote, setNewQuote] = React.useState("");
  const [openQuotes, setOpenQuotes] = React.useState("");
  const [totalProforma, setTotalProforma] = React.useState("");
  const [proformaPending, setProformaPending] = React.useState("");
  const [requets, setRequets] = React.useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance.get(`${URL}/user`).then(response => {
      dispatch(setName(response.data));
    });
    axiosInstance
      .get(`${URL}/totalCommercial`)
      .then(res => {
        console.log();
        setCommercialPending(res.data);
      })
      .catch(res => console.log);
    axiosInstance
      .get(`${URL}/quotesPending`)
      .then(res => {
        console.log();
        setQuotesPending(res.data);
      })
      .catch(res => console.log);
    axiosInstance
      .get(`${URL}/totalProforma`)
      .then(res => {
        console.log();
        setProformaPending(res.data);
      })
      .catch(res => console.log);
    axiosInstance
      .get(`${URL}/allRequests`)
      .then(res => {
        console.log();
        setRequets(res.data);
      })
      .catch(res => console.log);
    axiosInstance
      .get(`${URL}/counterQuotes/1`)
      .then(res => {
        console.log();
        setNewQuote(res.data);
      })
      .catch(res => console.log);
    axiosInstance
      .get(`${URL}/totalProforma`)
      .then(res => {
        console.log();
        setTotalProforma(res.data);
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
          <button.ButtonHistory
            text="Quotes"
            onSubmit={() => router.push("/SuperAdmin/quotations")}
          />
          <button.ButtonHistory
            text="Proformas"
            onSubmit={() => router.push("/SuperAdmin/proforma/")}
          />
          <button.ButtonChat
            text="Assistant"
            icon={<Chat size="20" className="text-[#024f72]" />}
            onSubmit={() => dispatch(openClose(true))}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between w-full pt-5 gap-5">
        <div className="hidden w-2/6 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHAdmin type="commercial" number={commercialPending} />
          <modul.ModuleHAdmin type="Proforma" number={proformaPending} />
        </div>
        <div className="flex flex-col w-3/4 h-full gap-2">
          <div className="flex flex-col justify-center">
            <div className="flex gap-6 w-full h-full">
              <modul.ModuleAdmin
                value={newQuote}
                text="New quotations"
                type="Quotes"
              />
              <modul.ModuleAdmin
                value={totalProforma}
                text="New proformas"
                type="Proforma"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-6 w-full h-full">
              <modul.ModuleAdmin
                value={openQuotes}
                text="New shipments"
                type="Shipments"
              />
              <modul.ModuleAdmin text="shipments completed" type="Completed" />
            </div>
          </div>
        </div>
        <div className="hidden w-2/6 h-full xl:flex xl:flex-col gap-5">
          <modul.ModuleHAdmin type="Quote pending" number={quotesPending} />
          <modul.ModuleHAdmin type="Request" number={commercialPending} />
        </div>
      </div>
    </Desk>
  );
};

export default Dashboard;
