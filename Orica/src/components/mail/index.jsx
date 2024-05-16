import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { addMail } from "@/redux/features/mailSlice";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { URL } from "@/constans/constans";
import { change } from "@/redux/features/authSlice.js";

const Mail = ({ type, close, add, confirm }) => {
  const permissions = useSelector(state => state.user);
  const loading = useSelector(state => state.auth);
  const email = useSelector(state => state.mail.mail);
  const shipNumeber = useSelector(state => state.ship.number);
  const dispatch = useDispatch();

  console.log(shipNumeber);

  const onSubmit = () => {
    dispatch(change(true));
    axiosInstance
      .post(`${URL}/shipment/send`, {
        email: email,
        number: shipNumeber,
      })
      .then(res => {
        dispatch(change(false));
        enqueueSnackbar("mail send", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        setTimeout(() => {
          close();
        }, 1000);
        dispatch(removeCart());
      })
      .catch(err => {
        dispatch(change(false));
        console.log(err);
      });
  };

  return (
    <section className="fixed flex z-20 w-full h-full items-center justify-center ">
      <SnackbarProvider />
      <div className="fixed w-full h-full bg-[#024f7a82]" onClick={close} />
      <div className="fixed z-30 w-4/12 h-96 p-8 bg-white shadow-base rounded-lg">
        <span className="text-2xl font-body font-semibold">Send mail</span>
        <div className="flex flex-col mt-10 w-full items-center gap-24">
          <input.InputQuoteLg text="email" add={addMail} />
          <button.ButtonChange
            text={`Send`}
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
      </div>
    </section>
  );
};

export default Mail;
