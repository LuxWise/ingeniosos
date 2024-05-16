import React from "react";
import Image from "next/image";
import logo from "../../assets/OricaLayout.svg";
import { useDispatch, useSelector } from "react-redux";
import { openClose } from "@/redux/features/logoutSlice";

const Navbar = () => {
  return (
    <div className="Navbar">
      <NavbarLeft />
      <NavbarRight />
    </div>
  );
};

const NavbarLeft = () => {
  return <Image className="Logo" src={logo} alt="Logo" />;
};

const NavbarRight = () => {
  const user = useSelector(state => state.user.name);
  const dispatch = useDispatch();

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={() => dispatch(openClose(true))}
    >
      <Image
        className="user"
        src="https://orica.ingeniososweb.com/img/user.png"
        width="350"
        height="350"
        alt="User"
      />
      <span className="font-semibold font-body">{user.name}</span>
    </div>
  );
};

export default Navbar;
