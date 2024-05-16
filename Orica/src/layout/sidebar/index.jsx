import { useRouter } from "next/router.js";
import { AiFillHome as Home } from "react-icons/ai";
import { FaClipboard as Quotations } from "react-icons/fa";
import { RiMapPin2Fill as Shipping } from "react-icons/ri";
import { BiSupport as Support } from "react-icons/bi";
import { TbDeviceIpadMinus as Admin } from "react-icons/tb";
import { FaDatabase as Database } from "react-icons/fa";
import { IoIosListBox as Proforma } from "react-icons/io";
import { FaWallet as Wallet } from "react-icons/fa6";
import { FaFileUpload as Upload } from "react-icons/fa";
import { FaClipboardList as Clipboard } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdBorderColor as Order } from "react-icons/md";
import { MdViewModule as Division } from "react-icons/md";

const Sidebar = () => {
  const baseRoute = useSelector(state => state.route.route);

  return (
    <div className="Sidebar">
      <div className="flex flex-col mt-14 gap-8">
        <SidebarModules
          icon={<Home size="25" />}
          text="Dashboard"
          route="dashboard"
        />
        {baseRoute !== "Shipment" && (
          <SidebarModules
            icon={<Quotations size="25" />}
            text="Quotations"
            route="quotations"
          />
        )}
        {baseRoute === "ChiefCommercial" && (
          <SidebarModules
            icon={<Division size="27" />}
            text="Divisions"
            route="divisions"
          />
        )}
        {baseRoute === "ChiefCommercial" && (
          <SidebarModules
            icon={<Order size="25" />}
            text="Order Name"
            route="orderName"
          />
        )}
        {baseRoute === "Commercial" && (
          <SidebarModules
            icon={<Order size="25" />}
            text="Order Name"
            route="orderName"
          />
        )}
        {baseRoute === "Customer" && (
          <SidebarModules
            icon={<Support size="25" />}
            text="Support"
            route="support"
          />
        )}
        {baseRoute === "Customer" && (
          <SidebarModules
            icon={<Wallet size="25" />}
            text="Proforma"
            route="proforma"
          />
        )}
        {baseRoute === "Customer" && (
          <SidebarModules
            icon={<Clipboard size="25" />}
            text="Statement of account"
            route="statementAccount"
          />
        )}
        {baseRoute !== "Proforma" && (
          <SidebarModules
            icon={<Shipping size="25" />}
            text="Shipping"
            route="shipping"
          />
        )}
        {baseRoute === "Proforma" && (
          <SidebarModules
            icon={<Proforma size="25" />}
            text="Proforma"
            route="proformas"
          />
        )}
        {baseRoute === "Proforma" && (
          <SidebarModules
            icon={<Upload size="25" />}
            text="Statement of account"
            route="statementAccount"
          />
        )}
        {baseRoute === "SuperAdmin" && (
          <SidebarModules
            icon={<Proforma size="25" />}
            text="Proforma"
            route="proforma"
          />
        )}
        {baseRoute === "SuperAdmin" && (
          <SidebarModules
            icon={<Admin size="25" />}
            text="User Manager"
            route="userManager"
          />
        )}
        {baseRoute === "SuperAdmin" && (
          <SidebarModules
            icon={<Division size="27" />}
            text="Divisions"
            route="divisions"
          />
        )}
        {baseRoute === "SuperAdmin" && (
          <SidebarModules
            icon={<Order size="25" />}
            text="Order Name"
            route="orderName"
          />
        )}
        {baseRoute === "SuperAdmin" && (
          <SidebarModules
            icon={<Database size="25" />}
            text="Database"
            route="database"
          />
        )}
      </div>
    </div>
  );
};

const SidebarModules = ({ text, icon, route }) => {
  const router = useRouter();
  const baseRoute = useSelector(state => state.route.route);

  return (
    <div
      className="sidebarModule group"
      onClick={() => router.push(`/${baseRoute}/${route}`)}
    >
      {icon}
      <span className="text-lg font-medium font-body">{text}</span>
    </div>
  );
};

export default Sidebar;
