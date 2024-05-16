import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import managing from "@/assets/managing agent.png";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { useRouter } from "next/router";
import { URL } from "@/constans/constans";

const SupportManagement = () => {
  const [number, setNumber] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/requests/3`)
      .then(res => {
        const last = res.data.length - 1;
        setNumber(res.data[last].id);
        setDate(res.data[last].date);
        setDescription(res.data[last].description);
        setType(res.data[last].type);
        setStatus(res.data[last].status);
      })
      .catch(console.log);
  }, []);

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          Commercial Request
        </span>
        <div className="flex gap-5">
          <button.ButtonQuotations
            text="New request"
            onSubmit={() =>
              router.push("/Customer/Support/newRequest/commercial/")
            }
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-2/4 mt-5 ">
        <div className="flex w-full h-full gap-5">
          <modul.ModuleRequest
            title="Last request"
            number={number}
            subject={type}
            description={description}
            status={status}
          />
          <modul.ModuleAccountable img={managing} name="Alejandro" />
        </div>
      </div>

      <div className="flex w-full mt-5 ">
        <modul.ModuleWlg
          title="Requests"
          type="Request"
          number={number}
          date={date}
          status={status}
        />
      </div>

      <div className="flex items-center justify-center mt-4 w-full">
        <span className="font-medium font-body text-lg text-sky-600 cursor-pointer">
          view all
        </span>
      </div>
    </Desk>
  );
};

export default SupportManagement;
