import React from "react";
import { loading } from "../loading";
import { FaCheck } from "react-icons/fa6";

const ButtonSubmit = ({ text, onSubmit, log }) => {
  return (
    <div
      onClick={onSubmit}
      className="flex items-center justify-center w-56 h-12 bg-[#0099CC] rounded-xl cursor-pointer"
    >
      {log == true ? (
        <loading.LoadingLogin />
      ) : (
        <span className="text-white text-lg font-medium font-body">{text}</span>
      )}
    </div>
  );
};

const ButtonQuotations = ({ text, onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-44 h-10 shadow-md shadow-sky-200 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-sky-300 transition-all duration-300"
    >
      <span className="text-md font-medium font-body">{text}</span>
    </div>
  );
};

const ButtonHistory = ({ text, onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-44 h-10 bg-[#0099CC] rounded-2xl cursor-pointer hover:shadow-md hover:bg-sky-600 transition-all duration-300"
    >
      <span className="text-white text-md font-medium font-body">{text}</span>
    </div>
  );
};

const ButtonAdd = ({ text, onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-16 h-8 mb-1 bg-[#0099CC] rounded-2xl cursor-pointer hover:shadow-md hover:bg-sky-600 transition-all duration-300"
    >
      <span className="text-white text-md font-medium font-body">{text}</span>
    </div>
  );
};

const ButtonUpdate = ({ text, onSubmit, icon }) => {
  return (
    <div
      onClick={onSubmit}
      className="flex items-center justify-center w-44 h-10 shadow-md shadow-sky-300 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-sky-300 transition-all duration-300 gap-5"
    >
      <span className="text-md font-medium font-body">{text}</span>
      {icon}
    </div>
  );
};

const ButtonIndex = ({ text, onSubmit, log }) => {
  return (
    <div
      onClick={onSubmit}
      className="flex w-10 rounded-md mx-1 items-center justify-center shadow-md shadow-sky-200 cursor-pointer transition-all hover:bg-sky-500 duration-500"
    >
      {log == true ? (
        <loading.LoadingLogin />
      ) : (
        <span className="text-sky-500 text-md font-medium font-body">
          {text}
        </span>
      )}
    </div>
  );
};

const ButtonPage = ({ text, onSubmit, log }) => {
  return (
    <div
      onClick={onSubmit}
      className="flex w-20 rounded-md mx-1 items-center bg-white justify-center shadow-md shadow-sky-200 cursor-pointer transition-all hover:bg-sky-500 duration-500 select-none "
    >
      {log == true ? (
        <loading.LoadingLogin />
      ) : (
        <span className="text-sky-600 text-md font-medium font-body">
          {text}
        </span>
      )}
    </div>
  );
};

const ButtonChange = ({ text, onSubmit, log }) => {
  return (
    <div
      onClick={onSubmit}
      className="flex items-center justify-center w-3/4 h-12 bg-[#0099CC] rounded-xl cursor-pointer"
    >
      {log == true ? (
        <loading.LoadingLogin />
      ) : (
        <span className="text-white text-md font-medium font-body">{text}</span>
      )}
    </div>
  );
};

const ButtonChat = ({ text, onSubmit, icon }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-32 h-10 shadow-md 
    shadow-sky-300 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-sky-300 transition-all duration-300"
    >
      <div className="flex gap-2">
        <span className="text-md font-medium font-body">{text}</span>
        {icon}
      </div>
    </div>
  );
};

const ButtonSendChat = ({ text, onSubmit, icon }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-16 h-8 mb-1 bg-[#0099CC] rounded-2xl cursor-pointer hover:shadow-md hover:bg-sky-600 transition-all duration-300"
    >
      {icon}
    </div>
  );
};

const ButtonModuleCommercial = ({ text, onSubmit, icon }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-24 h-10 shadow
    shadow-sky-400 bg-sky-100 rounded-2xl cursor-pointer hover:shadow-md hover:shadow-sky-400 transition-all duration-300"
    >
      <div className="flex gap-2">
        <span className="text-md text-sky-800 font-medium font-body">
          {text}
        </span>
        {icon}
      </div>
    </div>
  );
};

const ButtonCheck = ({ onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-24 h-10 shadow
    shadow-sky-400 bg-sky-100 rounded-2xl cursor-pointer hover:shadow-md hover:shadow-sky-400 transition-all duration-300"
    >
      <div className="flex gap-2">
        <FaCheck size={20} className="text-[#0284c7]" />
      </div>
    </div>
  );
};

const ButtonDivide = ({ text, onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-20 h-10 mb-1 bg-[#38bdf8] rounded-2xl cursor-pointer hover:shadow-md hover:bg-sky-600 transition-all duration-300"
    >
      <span className="text-white text-lg font-medium font-body">{text}</span>
    </div>
  );
};

const ButtonSubmitDivide = ({ text, onSubmit }) => {
  return (
    <div
      onClick={onSubmit}
      className="hidden lg:flex items-center justify-center w-20 h-10 mb-1 bg-[#38bdf8] rounded-2xl cursor-pointer hover:shadow-md hover:bg-sky-600 transition-all duration-300"
    >
      <span className="text-white text-lg font-medium font-body">{text}</span>
    </div>
  );
};

export const button = {
  ButtonSubmit,
  ButtonQuotations,
  ButtonHistory,
  ButtonAdd,
  ButtonUpdate,
  ButtonIndex,
  ButtonPage,
  ButtonChange,
  ButtonChat,
  ButtonSendChat,
  ButtonModuleCommercial,
  ButtonCheck,
  ButtonDivide,
  ButtonSubmitDivide,
};
