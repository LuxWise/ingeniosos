import React from "react";
import { button } from "@/components/button/index.jsx";
import { input } from "@/components/input/index.jsx";
import { IoMdSend as Send } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  addMessages,
  clearMessage,
} from "@/redux/features/chatSlice";
import axiosInstance from "@/axiosInstance";
import { URL } from "@/constans/constans";

export const Chat = ({ close }) => {
  const chat = useSelector(state => state.chat.message);
  const chatAll = useSelector(state => state.chat.messages);
  const dispatch = useDispatch();
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [chatAll]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmit = () => {
    dispatch(addMessages(chat));
    dispatch(clearMessage(true));

    axiosInstance
      .post(`${URL}/chat`, { question: chat })
      .then(res => dispatch(addMessages(res.data.result)))
      .then(() => scrollToBottom());
  };

  return (
    <section className="fixed z-10 flex w-full h-full items-center justify-end ">
      <div className="fixed w-full h-full bg-[#f9fbffc2]" onClick={close} />
      <div className="fixed w-96 h-[75%] shadow-2xl bg-white rounded-md mr-16">
        <div className="w-full h-14 bg-[#0099cc] rounded-t-md p-10">
          <span className="text-white font-body font-bold text-3xl">
            Assistant
          </span>
        </div>
        <div className="transform">
          <svg viewBox="0 0 1920 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="1920" height="240" fill="#0099cc" />
            <path
              d="M1920,240C1708.5,247,218,252.16666666666666,0,240C-218,227.83333333333334,400.5,174,612,167C823.5,160,1051,185.83333333333334,1269,198C1487,210.16666666666666,2131.5,233,1920,240C1708.5,247,218,252.16666666666666,0,240"
              fill="#ffffff"
            />
          </svg>
        </div>
        <section className="flex flex-col w-full h-4/6 overflow-y-auto p-5 gap-2 mb-3">
          {chatAll.map((item, index) => (
            <ChatItem key={item} text={item} bot={index} />
          ))}
          <div ref={messagesEndRef} />
        </section>
        <div className="flex w-full h-10 gap-3 px-5">
          <input.InputChat add={addMessage} />
          <button.ButtonSendChat
            icon={<Send size={20} className="text-white" />}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </section>
  );
};
const ChatItem = ({ text, bot }) => {
  return (
    <div
      className={`p-2 rounded-lg ${
        bot % 2 == 0 ? "bg-slate-300" : "bg-sky-300"
      }`}
    >
      <span>{text}</span>
    </div>
  );
};
