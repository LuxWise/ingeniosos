import Desk from "@/layout/desk";
import React from "react";
import userImage from "@/assets/user.png";
import CostumerService from "@/assets/costumer service.png";
import managing from "@/assets/managing agent.png";
import { modul } from "@/components/modul";

const Support = () => {
  return (
    <Desk>
      <span className="font-semibold font-body text-4xl">Support</span>
      <section className="flex mt-5 w-full ">
        <div className="flex flex-col w-full gap-10">
          <modul.ModuleSupport
            text="commercial"
            img={userImage}
            name="Alejandro"
            position="customer service"
            typeRequests="commercial"
          />
          <modul.ModuleSupport
            text="customer service"
            img={CostumerService}
            name="Laura Riaño"
            position="customer service agent"
            typeRequests="customerService"
          />
        </div>
        <modul.ModuleSupport
          text="management"
          img={managing}
          name="David Mendez"
          position="managing agent"
          typeRequests="management"
        />
      </section>
    </Desk>
  );
};

export default Support;
