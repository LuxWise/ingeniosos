import React from "react";
import Image from "next/image";
import logo from "../../assets/user.png";
import excelIcon from "../../assets/excelIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import { FaWhatsapp as Whatsapp } from "react-icons/fa";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { BiSupport as Support } from "react-icons/bi";
import { add, addQuantity } from "@/redux/features/reviewSlice";
import { ImCross as Cross } from "react-icons/im";
import { add as addProforma } from "@/redux/features/proformaSlice";
import {
  newPassword,
  newUsername,
  openClose,
} from "@/redux/features/userSlice";
import {
  addDate,
  addDivide,
  addDivideSubmit,
  addPort,
  addPrice,
  addQuantityDivide,
  setId,
  setProduct,
  setQuantityDivide,
} from "@/redux/features/divideSlice";
import Swal from "sweetalert2";
import { removeDivideSelect } from "@/redux/features/orderNameSlice";

// modules width

const ModuleWlg = ({ title, type, number, date, status }) => {
  return (
    <section className="flex flex-col w-full h-full">
      <span className="font-semibold font-body ml-5">{title}</span>
      <div className=" flex-col w-full h-28 shadow-base rounded-lg bg-white">
        <div className="flex ml-24 max-md:ml-16 mt-4 gap-20 max-md:gap-16 text-sm text-gray-600 font-body font-medium">
          <span className="ml-5"># {type}</span>
          <span className="max-md:hidden ml-5">Date</span>
          <span className="">Status</span>
        </div>
        {number == "" ? (
          <div className="flex w-full h-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex ml-5 mt-2 gap-12 max-md:gap-6">
            <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
            <span className="text-lg font-semibold font-body ">
              {type}#{number}
            </span>
            <span className="max-md:hidden text-lg font-semibold font-body ">
              {date}
            </span>
            <span className=" text-lg font-semibold font-body ">{status}</span>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleWmd = ({ title, type, number, date, status }) => {
  return (
    <section className="flex flex-col w-full h-full">
      <span className="hidden lg:block font-semibold font-body ml-5">
        {title}
      </span>
      <div className="hidden lg:flex flex-col w-full h-full shadow-base rounded-lg bg-white">
        <div className="flex ml-24 mt-4 gap-20 text-sm text-gray-600 font-body font-medium">
          <span className="ml-5"># {type}</span>
          <span className="ml-5">Date</span>
        </div>
        {number == "" ? (
          <div className="flex w-full h-full justify-center mt-10">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex ml-5 mt-2 gap-12">
            <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
            <span className="text-lg font-semibold font-body ">
              {type}#{number}
            </span>
            <span className="text-lg font-semibold font-body ">{date}</span>
            <span className="hidden text-lg font-semibold font-body ">
              {status}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleWsm = ({ title, type, number, date, status }) => {
  return (
    <section className="flex flex-col w-full h-full">
      <span className="hidden lg:block font-semibold font-body ml-5">
        {title}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[120px] shadow-base rounded-lg bg-white">
        <div className="flex ml-24 mt-4 gap-20 text-sm text-gray-600 font-body font-medium">
          <span className="ml-5"># {type}</span>
          <span className="ml-5">Date</span>
        </div>
        {number == "" ? (
          <div className="flex w-full h-full justify-center mt-10">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex ml-5 mt-2 gap-12">
            <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
            <span className="text-lg font-semibold font-body ">
              {type}#{number}
            </span>
            <span className="text-lg font-semibold font-body ">{date}</span>
            <span className="text-lg font-semibold font-body ">{status}</span>
          </div>
        )}
      </div>
    </section>
  );
};

// modules height

const ModuleHlg = ({ text, input, type, number, full }) => {
  return (
    <section className="w-full h-full">
      <span className="font-semibold font-body ml-5">Pending</span>
      <div
        className={`flex flex-col w-full  ${
          full ? "h-[95%] mt-2" : "h-[240px]"
        }  justify-between shadow-base rounded-lg bg-white`}
      >
        <div
          className={` w-full h-full pt-3 overflow-y-auto ${
            full ? "pl-14" : "pl-5"
          }`}
        >
          {number == "" ? (
            <div className="flex w-full justify-center mt-5">
              <span className="text-sm text-gray-600 font-body font-medium">
                No {type}
              </span>
            </div>
          ) : (
            number.map(item => {
              return (
                <ItemsModuleHlg type={type} number={item.id} key={item.id} />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

const ItemsModuleHlg = ({ type, number }) => {
  return (
    <div className="flex gap-5 my-4">
      <div className="rounded-full w-6 h-6 border-4 border-gray-700" />
      <span className="text-lg font-semibold font-body ">
        {type} # {number}
      </span>
    </div>
  );
};

const ModuleHmd = ({ type, number }) => {
  return (
    <section className="flex flex-col w-full h-[230px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full pl-4 pt-3 overflow-y-auto">
        {number == "" ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          number.map(item => {
            return (
              <ItemsModuleHmd type={type} number={item.id} key={item.id} />
            );
          })
        )}
      </div>
    </section>
  );
};

const ItemsModuleHmd = ({ type, number }) => {
  return (
    <div className="flex gap-5 my-2">
      <div className="rounded-full w-6 h-6 border-4 border-gray-700" />
      <span className="text-lg font-semibold font-body ">
        {type} # {number}
      </span>
    </div>
  );
};

// mod modeles

const ModuleColor = ({ type, text, value }) => {
  return (
    <section className="flex flex-col max-md:w-full h-full">
      <span className="font-semibold font-body ml-5">{type}</span>

      <div className=" w-full  h-[180px] border-2 border-sky-300  shadow-base rounded-lg bg-sky-200">
        <div className="flex flex-col h-full justify-center items-center">
          <span className="font-semibold font-body text-3xl">{value}</span>
          <span className="font-semibold font-body">{text}</span>
        </div>
      </div>
    </section>
  );
};

const ModuleAdmin = ({ type, text, value }) => {
  return (
    <section className="flex flex-col w-2/4 h-full">
      <span className="font-semibold font-body ml-5">{type}</span>

      <div className=" lg:w-full h-[210px] border-2 border-sky-300  shadow-base rounded-lg bg-sky-200">
        <div className="flex flex-col h-full justify-center items-center">
          <span className="font-semibold font-body text-3xl">{value}</span>
          <span className="font-semibold font-body">{text}</span>
        </div>
      </div>
    </section>
  );
};

const ModuleUserMod = ({ type, info }) => {
  return (
    <section className="flex flex-col w-full h-[400px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full pl-4 pt-3 overflow-y-auto">
        {info == [] || info == undefined || info == null ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex flex-col ml-5 mt-2 gap-3 text-lg font-body font-medium">
            <div className="flex items-center justify-center">
              <Image
                className="w-28 h-28 rounded-full object-cover"
                src={logo}
                alt="user"
              />
            </div>
            <span>
              {info.name} {info.lastname}
            </span>
            <span className={info.status ? "text-blue-500" : "bg-gray-500"}>
              {info.status}
            </span>
            <span>{info.role}</span>
            <span>{info.email}</span>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleOrderNameDetails = ({ type, info }) => {
  return (
    <section className="flex flex-col w-full h-[400px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full pl-4 pt-3 overflow-y-auto">
        {info == [] || info == undefined || info == null ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex flex-col ml-5 mt-2 gap-3 text-lg font-body font-medium justify-center h-[80%]">
            <span>Order name: {info.name}</span>
            <span>Quantity: {info.quantity}</span>
            <span>Port: {info.port}</span>
            <span>Price: {info.price}</span>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleDivisionDetails = ({ type, info }) => {
  return (
    <section className="flex flex-col w-full h-[400px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full  pt-3 overflow-y-auto">
        {info == [] || info == undefined || info == null ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex flex-col  mt-2 gap-3 text-lg font-body font-medium justify-center items-center h-[80%]">
            <div className="flex items-center justify-center w-3/5 h-16  rounded-lg">
              <span className="text-2xl">Quote: {info.idquote}</span>
            </div>
            <div className="flex items-center justify-center w-3/5 h-16 bg-sky-300 rounded-lg">
              <span>Product: {info.product}</span>
            </div>
            <div className="flex items-center justify-center w-3/5 h-16 bg-sky-300 rounded-lg">
              <span>Quantity: {info.quantity}</span>
            </div>
            <div className="flex items-center justify-center w-3/5 h-16 bg-sky-300 rounded-lg p-4">
              <span className="text-center">{info.port}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleOrderNameModify = ({ type, info }) => {
  return (
    <section className="flex flex-col w-full h-[400px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full pl-4 pt-3 overflow-y-auto">
        {info == [] || info == undefined || info == null ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex flex-col   gap-3 text-lg font-body font-medium justify-center items-center ">
            <div className="flex items-center justify-center w-3/5 h-16  rounded-lg">
              <span className="text-2xl">Ordername: {info.id}</span>
            </div>
            <div className="flex items-center justify-center w-3/5 h-16 bg-sky-300 rounded-lg">
              <span>Divisions: {info.divisions}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ModulePermissions = ({ type, info, typebase, add }) => {
  const [permission, setPermission] = React.useState(typebase);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (info && typebase) {
      const index = info.find(perm => perm.name === typebase);
      if (index) {
        dispatch(add(index.id));
      }
    }
  }, [info, typebase, dispatch, add]);

  const handleChange = event => {
    setPermission(event.target.name);
    dispatch(add(event.target.id));
  };

  return (
    <section className="flex flex-col w-full h-[320px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="flex flex-col w-full h-full mt-4 ">
        {info.map(item => (
          <div key={item.name} className="">
            <label className="flex items-center gap-2 pl-5 py-2 hover:bg-sky-100">
              <div
                className={`rounded-full w-6 h-6 border-4 border-sky-600 ${
                  permission === item.name ? "bg-sky-600" : "bg-white"
                }`}
              />
              <input
                type="radio"
                id={item.id}
                name={item.name}
                value={item.name}
                checked={permission === item.name}
                onChange={handleChange}
                className="hidden"
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

const ModuleModify = ({ type, children }) => {
  return (
    <section className="flex flex-col w-full h-[180px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">Change {type}</span>
      <div className=" flex flex-col w-full h-full mt-4 pl-5 gap-5">
        <span>Change {type}</span>
        {children}
      </div>
    </section>
  );
};

const ModuleUserModify = ({ type, info }) => {
  return (
    <section className="flex flex-col w-full h-[400px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full pl-4 pt-3 overflow-y-auto">
        {info == [] || info == undefined || info == null ? (
          <div className="flex w-full justify-center mt-5">
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          </div>
        ) : (
          <div className="flex flex-col ml-5 mt-2 gap-3 text-lg font-body font-medium">
            <div className="flex items-center justify-center">
              <Image
                className="w-28 h-28 rounded-full object-cover"
                src={logo}
                alt="user"
              />
            </div>
            <span>
              {info.name} {info.lastname}
            </span>
            <span className={info.status ? "text-blue-500" : "bg-gray-500"}>
              {info.status}
            </span>
            <span>{info.role}</span>
            <span>{info.email}</span>
          </div>
        )}
      </div>
    </section>
  );
};

const ModuleChange = ({ type, close, add, confirm }) => {
  const permissions = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (type === "username") {
      if (
        permissions.newUsername === "" ||
        permissions.confirmUsername === ""
      ) {
        return;
      }

      if (permissions.newUsername === permissions.confirmUsername) {
        dispatch(newUsername(permissions.newUsername));
        dispatch(openClose(false));
      }
    } else {
      if (
        permissions.newPassword === "" ||
        permissions.confirmPassword === ""
      ) {
        return;
      }

      if (permissions.newPassword === permissions.confirmPassword) {
        dispatch(newPassword(permissions.newPassword));
        dispatch(openClose(false));
      }
    }
  };
  return (
    <section className="fixed flex z-20 w-full h-full items-center justify-center ">
      <div className="fixed w-full h-full bg-[#024f7a82]" onClick={close} />
      <div className="fixed z-30 w-4/12 h-96 p-8 bg-white shadow-base rounded-lg">
        <span className="text-2xl font-body font-semibold">New {type}</span>
        <div className="flex flex-col mt-5 w-full items-center gap-5">
          <input.InputQuoteLg text={`New ${type}`} add={add} />
          <input.InputQuoteLg text={`Confirm ${type}`} add={confirm} />
          <button.ButtonChange text={`Save ${type}`} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

const ModuleHAdmin = ({ type, number }) => {
  return (
    <section className="flex flex-col w-full h-[230px] justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold font-body ml-5 mt-5">{type}</span>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex w-full justify-center mt-5">
          {number == "" ? (
            <span className="text-sm text-gray-600 font-body font-medium">
              No {type}
            </span>
          ) : (
            <div className="flex flex-col h-full mt-5 justify-center items-center">
              <span className="font-semibold font-body text-3xl">{number}</span>
              <span className="font-semibold font-body">{type}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// specific modules

// module cart

const ModuleCart = ({ text, value, remove }) => {
  const cart = useSelector(state => state.cart.cart);
  return (
    <section className="w-full h-full">
      <div className="hidden lg:flex flex-col w-full h-[50%] shadow-base rounded-lg bg-white">
        <div className="flex ml-24 mt-4 gap-20 text-sm text-gray-600 font-body font-medium">
          <span className="ml-5">Product</span>
          <span className="ml-5">Quantity</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {cart.map(cart => {
            return (
              <CartItem
                key={cart.product}
                product={cart.product}
                quantity={cart.quantity}
                remove={remove}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CartItem = ({ product, quantity, remove }) => {
  const [hover, sethover] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex ml-10 mt-2 gap-32">
      <div className="flex items-center  w-28 gap-10">
        <div>
          {hover ? (
            <Cross
              className="text-red-500 cursor-pointer"
              size="24"
              onMouseLeave={() => sethover(false)}
              onClick={() => dispatch(remove(product))}
            />
          ) : (
            <div
              className={`rounded-full w-6 h-6 border-4 border-sky-600`}
              onMouseEnter={() => sethover(true)}
            />
          )}
        </div>
        <span className="text-lg font-semibold font-body ">{product}</span>
      </div>
      <div className="flex justify-center">
        <span className="text-lg font-semibold font-body ">{quantity}</span>
      </div>
    </div>
  );
};

// module ordername

const ModuleOrderName = ({ text, value, remove }) => {
  const cart = useSelector(state => state.orderName.divideSelect);
  return (
    <section className="w-full">
      <div className="hidden lg:flex flex-col w-full h-full shadow-base rounded-lg bg-white">
        <div className="grid grid-cols-2 ml-16 mt-5 mb-2 text-sm text-gray-600 font-body font-medium gap-5">
          <span>Port</span>
          <span>Date</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {cart.map(cart => {
            return (
              <ItemOrderName
                key={cart.id}
                id={cart.id}
                port={cart.port}
                date={cart.date}
                remove={remove}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ItemOrderName = ({ id, port, date, remove }) => {
  const [hover, sethover] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 ml-5 mt-2 ">
      <div className="flex gap-5">
        <div>
          {hover ? (
            <Cross
              className="text-red-500 cursor-pointer"
              size="24"
              onMouseLeave={() => sethover(false)}
              onClick={() => dispatch(removeDivideSelect(id))}
            />
          ) : (
            <div
              className={`rounded-full w-6 h-6 border-4 border-sky-600`}
              onMouseEnter={() => sethover(true)}
            />
          )}
        </div>
        <span className="text-lg font-semibold font-body ">{port}</span>
      </div>
      <div className="flex justify-center">
        <span className="text-lg font-semibold font-body ">{date}</span>
      </div>
    </div>
  );
};

// preview module

const ModulePreview = ({ text, value }) => {
  const preview = useSelector(state => state.preview.cart);
  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-[90%] h-[350px] shadow-base rounded-lg bg-white">
        <div className="grid grid-cols-2 text-sm text-gray-600 font-body font-medium mt-5 ml-20">
          <span>Product</span>
          <span>Quantity</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => {
            return (
              <PreviewItem
                key={cart.product}
                product={cart.product}
                quantity={cart.quantity}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PreviewItem = ({ product, quantity }) => {
  return (
    <div className="grid grid-cols-2  items-center py-3 px-8 border-gray-300 ml-8">
      <div className="flex gap-4 items-center">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="pl-10 mr-6">
        <span className="text-lg font-semibold">{quantity}</span>
      </div>
    </div>
  );
};

// Review module

const ModuleReview = ({ text }) => {
  const preview = useSelector(state => state.preview.cart);
  const dispatch = useDispatch();

  const handleAdd = ({ product, quantity, price }) => {
    dispatch(add({ product, quantity, price }));
  };

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[300px] shadow-base rounded-lg bg-white">
        <div className="flex justify-center text-sm text-gray-600 font-body font-medium gap-20 mt-5">
          <span>Product</span>
          <span>Quantity</span>
          <span>Unit price</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => (
            <ReviewItem
              key={cart.product}
              product={cart.product}
              baseQuantity={cart.quantity}
              add={handleAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewItem = ({ product, baseQuantity, add }) => {
  const [quantity, setQuantity] = React.useState(baseQuantity);
  const [price, setPrice] = React.useState(0);

  const handleQuantity = event => {
    const newValue = event.target.value;
    setQuantity(newValue);
  };

  const handlePrice = event => {
    const newValue = event.target.value;
    setPrice(newValue);
  };

  React.useEffect(() => {
    add({ product, quantity, price });
  }, [product, quantity, price, add]);

  return (
    <div className="flex ml-10 mt-4 gap-5">
      <div className="flex flex-grow gap-4 items-center">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center ">
        <input
          onChange={handleQuantity}
          value={quantity}
          type="number"
          className="inputModuleReview"
        />
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center mr-16">
        <input
          onChange={handlePrice}
          value={price}
          type="number"
          placeholder="$0"
          className="inputModuleReview"
        />
      </div>
    </div>
  );
};

// Review module Commercial

const ModuleReviewCommercial = ({ text, open }) => {
  const preview = useSelector(state => state.preview.cart);
  const dispatch = useDispatch();

  const handleAdd = ({ product, quantity, price }) => {
    dispatch(add({ product, quantity, price }));
  };

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[350px] shadow-base rounded-lg bg-white">
        <div className="grid grid-cols-3 text-gray-600 font-body font-medium  mt-5 ml-28">
          <span>Product</span>
          <span>Quantity</span>
        </div>
        <div className="h-64 overflow-y-auto ml-10">
          {preview.map(cart => (
            <ReviewItemCommercial
              key={cart.id}
              id={cart.id}
              product={cart.product}
              baseQuantity={cart.quantity}
              add={handleAdd}
              open={open}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewItemCommercial = ({ id, product, baseQuantity, add, open }) => {
  const [quantity, setQuantity] = React.useState(baseQuantity);
  const [price, setPrice] = React.useState(0);
  const didvidSubmit = useSelector(state => state.divide.didvidSubmit);
  const find = didvidSubmit.find(item => item[1] === id);
  const dispatch = useDispatch();

  React.useEffect(() => {
    add({ product, quantity, price });
  }, [product, quantity, price, add]);

  const handleQuantity = event => {
    const newValue = event.target.value;
    setQuantity(newValue);
  };

  console.log(setId);

  const openDivide = () => {
    dispatch(open(true));
    dispatch(setId(id));
    dispatch(setProduct(product));
    dispatch(setQuantityDivide(baseQuantity));
  };

  return (
    <div className="grid grid-cols-3 ml-10 mt-5">
      <div className="flex items-center gap-5">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <input
        onChange={handleQuantity}
        value={quantity}
        type="number"
        className="inputModuleReview"
      />
      {find ? (
        <button.ButtonCheck text="good" />
      ) : (
        <button.ButtonModuleCommercial text="Divide" onSubmit={openDivide} />
      )}
    </div>
  );
};

// Total module Commercial

const TotalCommercial = () => {
  return (
    <section className="w-full  ">
      <div className="ml-5 mb-4">
        <span className="text-xl font-body font-semibold">Total</span>
      </div>

      <div className="h-full flex flex-col p-10 bg-white rounded-lg shadow-base">
        <span className="text-lg font-body">Total amount:</span>
        <span className="text-xl font-body m-5">15</span>
        <span className="text-lg font-body">Total value to pay:</span>
        <span className="text-lg font-body m-5">15</span>
      </div>
    </section>
  );
};

// Divide module

const Divide = ({ close }) => {
  const product = useSelector(state => state.divide.product);
  const quantity = useSelector(state => state.divide.quantity);
  const divid = useSelector(state => state.divide.divid);
  const id = useSelector(state => state.divide.id);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [inputValue, setInputValue] = React.useState(1);
  const [divide, setDivide] = React.useState([1]);
  const dispatch = useDispatch();

  const totalPages = Math.ceil(divide.length / 1);
  const indexOfLastItem = currentPage * 1;
  const indexOfFirstItem = indexOfLastItem - 1;
  const currentItems = divide.slice(indexOfFirstItem, indexOfLastItem);

  const genArray = longitud => {
    const nuevoArreglo = Array.from(
      { length: longitud },
      (_, index) => index + 1
    );
    return nuevoArreglo;
  };

  const handleChange = event => {
    const newValue = event.target.value;
    newValue >= 1 && setInputValue(newValue);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSubmit = () => {
    const array = genArray(inputValue);
    setDivide(array);
  };

  const onSave = () => {
    Swal.fire({
      text: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(addDivideSubmit([divid, id]));
        close();
      }
    });
  };

  return (
    <section className="fixed flex z-20 w-full h-full items-center justify-center ">
      <div className="fixed w-full h-full bg-[#024f7a82]" onClick={close} />
      <section className="fixed flex items-center justify-center z-30 w-full gap-12">
        <div className=" w-3/12 h-64 p-8 bg-white shadow-base rounded-lg">
          <div className="mb-14">
            <h2 className="text-xl font-body font-semibold">
              Number of divisions
            </h2>
          </div>
          <div className=" flex items-center justify-center w-full gap-5">
            <input
              type="number"
              onChange={handleChange}
              value={inputValue}
              className="inputMiduleDivide"
            />
            <button.ButtonDivide text="divide" onSubmit={onSubmit} />
          </div>
        </div>
        <div className="flex flex-col w-6/12 h-full justify-center items-center gap-3">
          {currentItems.map(divid => (
            <DivideItem
              key={divid}
              number={divid}
              product={product}
              quantity={quantity}
            />
          ))}
          <div className="flex gap-16">
            {divide.length > 1 && (
              <div className="flex gap-2 transition-all">
                <button
                  className="bg-white py-1 px-3 rounded-xl"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <button
                  className="bg-white py-1 px-3  rounded-xl"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}

            {divid.length === divide.length && (
              <button
                className="bg-green-300 py-1 px-3 rounded-xl hover:shadow-md hover:shadow-sky-300 transition-all"
                onClick={onSave}
              >
                Confirm and save
              </button>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

const DivideItem = ({ number, product, quantity }) => {
  const setdata = useSelector(state => state.divide);
  const getdata = useSelector(state => state.divide.divid);
  let data = getdata.filter(data => data.page === number);
  const dispatch = useDispatch();

  if (data.length === 0) {
    data = [
      {
        port: "",
        quantity: "",
        price: "",
        date: "",
        page: number,
      },
    ];
  }

  const onSubmit = () => {
    dispatch(
      addDivide({
        port: setdata.port,
        quantity: setdata.quantityDivide,
        price: setdata.price,
        date: setdata.date,
        page: number,
      })
    );
  };

  console.log(data[0]);

  return (
    <div className="w-full h-96 p-8 bg-white shadow-base rounded-lg">
      <span className="text-2xl font-body font-semibold ">Divide {number}</span>
      <div className="grid grid-cols-2 mt-2">
        <div className="flex justify-center">
          <span className="text-lg text-gray-600 font-body font-medium ">
            Product
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-lg text-gray-600 font-body font-medium ">
            Quantity
          </span>
        </div>
        <div className="flex items-center justify-center gap-5 mr-8">
          <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
          <span className="text-lg font-semibold">{product}</span>
        </div>
        <div className="flex justify-center">
          <span className="text-lg font-semibold">{quantity}</span>
        </div>
      </div>
      <section className="grid grid-cols-2 mt-2 gap-8">
        <div>
          <h2>Port</h2>
          <input.InputSelectDivide
            urldata="/ports"
            add={addPort}
            initialValue={data[0].port}
          />
        </div>
        <div>
          <h2>Quantity</h2>
          <input.InputDivide
            add={addQuantityDivide}
            typeofdata={"number"}
            page={number}
            initialValue={data[0].quantity}
          />
        </div>
        <div>
          <h2>Price</h2>
          <input.InputDivide
            add={addPrice}
            typeofdata={"number"}
            page={number}
            initialValue={data[0].price}
          />
        </div>
        <div>
          <h2>Date</h2>
          <input.InputDivide
            add={addDate}
            typeofdata={"date"}
            page={number}
            initialValue={data[0].date}
          />
        </div>
      </section>
      <div className="flex items-center justify-end my-7">
        <button.ButtonSubmitDivide text="save" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

// Proforma module

// Review module

const ModuleProforma = ({ text, preview }) => {
  const dispatch = useDispatch();

  const handleAdd = ({ product, quantity, price }) => {
    dispatch(addProforma({ product, quantity, price }));
  };

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[300px] shadow-base rounded-lg bg-white">
        <div className="flex justify-center text-sm text-gray-600 font-body font-medium gap-20 mt-5">
          <span>Product</span>
          <span>Quantity</span>
          <span>Unit price</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => (
            <ProformaItem
              key={cart.product}
              product={cart.product}
              baseQuantity={cart.quantity}
              basePrice={cart.price}
              add={handleAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProformaItem = ({ product, baseQuantity, basePrice, add }) => {
  const [quantity, setQuantity] = React.useState(baseQuantity);
  const [price, setPrice] = React.useState(basePrice);

  const handleQuantity = event => {
    const newValue = event.target.value;
    setQuantity(newValue);
  };

  const handlePrice = event => {
    const newValue = event.target.value;
    setPrice(newValue);
  };

  React.useEffect(() => {
    add({ product, quantity, price });
  }, [product, quantity, price, add]);

  return (
    <div className="flex ml-10 mt-4 gap-5">
      <div className="flex flex-grow gap-4 items-center">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center ">
        <input
          onChange={handleQuantity}
          value={quantity}
          type="number"
          className="w-80 lg:w-20 pl-4 h-9 bg-white rounded-md outline-none p-2 border-b-2 border-gray-400"
        />
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center mr-16">
        <input
          onChange={handlePrice}
          value={price}
          type="number"
          placeholder="$0"
          className="w-80 lg:w-24 pl-4 h-9 bg-white rounded-md outline-none p-2 border-b-2 border-gray-400"
        />
      </div>
    </div>
  );
};

// approval

const ModuleApproval = ({ text, value, addPrice, addQuantity }) => {
  const preview = useSelector(state => state.preview.cart);

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-[90%] h-[350px] shadow-base rounded-lg bg-white">
        <div className="flex justify-center text-sm text-gray-600 font-body font-medium gap-20 mt-5">
          <span>Product</span>
          <span>Quantity</span>
          <span>Unit price</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => {
            return (
              <ApprovalItem
                key={cart.product}
                product={cart.product}
                quantity={cart.quantity}
                price={cart.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ApprovalItem = ({ product, quantity, price }) => {
  return (
    <div className="flex items-center gap-10 py-3 px-6 ml-2 border-gray-300">
      <div className="flex flex-grow gap-4">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="flex-shrink-0 w-1/5">
        <span className="text-lg font-semibold">{quantity}</span>
      </div>
      <div className="flex-shrink-0 w-1/5">
        <span className="text-lg font-semibold">{`$${price}`}</span>
      </div>
    </div>
  );
};

// module support

const ModuleSupport = ({ text, img, name, position, typeRequests }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-10/12 h-60 3xl:h-80 justify-between shadow-base rounded-lg bg-white">
      <span className="font-semibold  font-body text-lg ml-5 mt-5">{text}</span>
      <section className="flex h-full w-full justify-around">
        <div className="flex items-center justify-center mb-5 ml-5">
          <Image
            className="w-32 h-32 rounded-full object-cover"
            src={img}
            alt="Commercial"
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="flex flex-col w-full h-full">
            <span className="font-body font-semibold text-center text-xl">
              {name}
            </span>
            <span className="text-center text-sm ">{position}</span>
          </div>
          <div className="flex flex-col lg:flex-row w-full h-full items-center lg:gap-10">
            <Support
              size="30"
              className="font-body font-medium cursor-pointer text-[#024f72]"
              onClick={() => router.push(`/Customer/Support/${typeRequests}`)}
            />
            <div className="flex items-center font-body font-medium gap-2 cursor-pointer">
              <a href="https://wa.me/573232000096">
                <Whatsapp size="30" className="text-green-700" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ModuleRequest = ({ title, number, subject, description, status }) => {
  return (
    <section className="flex flex-col w-full h-full gap-5">
      <span className="hidden lg:block font-semibold font-body text-xl ml-5">
        {title}
      </span>
      {number == "" ? (
        <div className="flex items-center justify-center w-full h-full bg-white  shadow-base rounded-lg">
          <span className="font-body font-medium text-xl text-gray-600">
            No Request created
          </span>
        </div>
      ) : (
        <div className="w-full h-full bg-white  shadow-base rounded-lg">
          <div className="flex ">
            <div className="flex flex-col w-full items-start pl-20 pt-5 gap-2">
              <span className="font-body font-semibold">Request</span>
              <div className="flex w-8/12 h-16 rounded-lg bg-sky-200 items-center justify-center">
                <span className="font-body font-bold text-2xl">#{number}</span>
              </div>
            </div>
            <div className="flex flex-col w-full items-start justify-end pt-5 gap-2">
              <span className="font-body font-semibold">Subject</span>
              <div className="flex w-10/12 h-14 rounded-lg shadow-base p-2">
                <span className="font-body text-lg">{subject}</span>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="flex flex-col w-[140%] items-start pl-20 pt-5 gap-1 ">
              <span className="font-body font-semibold">Description</span>
              <div className="flex w-full h-20 rounded-lg p-2 shadow-base">
                <span className="font-body text-sm">{description}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pt-5">
              <span className="font-body font-semibold text-center text-2xl">
                {status}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ModuleAccountable = ({ img, name }) => {
  return (
    <section className="flex flex-col h-full gap-5">
      <span className="font-semibold font-body ml-5">Accountable</span>
      <div className="flex flex-col w-[250px] h-full items-center justify-center shadow-base rounded-lg bg-white gap-5">
        <Image
          className="w-28 h-28 rounded-full object-cover"
          src={img}
          alt="Accountable"
        />
        <span className="font-body font-semibold text-center text-xl">
          {name}
        </span>
      </div>
    </section>
  );
};

const ModuleDoc = ({ text, description, onSubmit }) => {
  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
      </div>
      <div
        className="flex items-center gap-10 pl-5 w-full h-20 shadow-base rounded-lg cursor-pointer"
        onClick={onSubmit}
      >
        <div className="w-10 h-10">
          <Image src={excelIcon} alt="excel icon" />
        </div>
        <span>{description}</span>
      </div>
    </section>
  );
};

// modify

// module modify quotation

const ModuleModifyProforma = ({ text, preview, quantity, price }) => {
  const dispatch = useDispatch();

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[300px] shadow-base rounded-lg bg-white">
        <div className="flex justify-center text-sm text-gray-600 font-body font-medium gap-20 mt-5">
          <span>Product</span>
          <span>Quantity</span>
          <span>Unit price</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => (
            <ModifyProformaItem
              key={cart.product}
              product={cart.product}
              baseQuantity={cart.quantity}
              basePrice={cart.price}
              addQuantity={quantity}
              addPrice={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ModifyProformaItem = ({
  product,
  baseQuantity,
  basePrice,
  addQuantity,
  addPrice,
}) => {
  const [quantity, setQuantity] = React.useState(baseQuantity);
  const [price, setPrice] = React.useState(basePrice);
  const dispatch = useDispatch();

  const handleQuantity = event => {
    const newValue = event.target.value;
    dispatch(addQuantity({ product: product, quantity: newValue }));
    setQuantity(newValue);
  };

  const handlePrice = event => {
    const newValue = event.target.value;
    dispatch(addPrice(newValue));
    setPrice(newValue);
  };

  return (
    <div className="flex ml-10 mt-4 gap-5">
      <div className="flex flex-grow gap-4 items-center">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center ">
        <input
          onChange={handleQuantity}
          value={quantity}
          type="number"
          className="w-80 lg:w-20 pl-4 h-9 bg-white rounded-md outline-none p-2 border-b-2 border-gray-400"
        />
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center mr-16">
        <input
          onChange={handlePrice}
          value={price}
          type="number"
          placeholder="$0"
          className="w-80 lg:w-24 pl-4 h-9 bg-white rounded-md outline-none p-2 border-b-2 border-gray-400"
        />
      </div>
    </div>
  );
};

const ModuleModifyQuote = ({ text, preview, quantity, price }) => {
  const dispatch = useDispatch();

  return (
    <section className="flex flex-col w-full h-full gap-4">
      <span className="hidden lg:block text-xl font-semibold font-body ml-5">
        {text}
      </span>
      <div className="hidden lg:flex flex-col w-full h-[300px] shadow-base rounded-lg bg-white">
        <div className="grid grid-cols-2 justify-center text-sm text-gray-600 font-body font-medium mt-5 ml-24">
          <span>Product</span>
          <span>Quantity</span>
        </div>
        <div className="h-64 overflow-y-auto">
          {preview.map(cart => (
            <ModifyQuotationItem
              key={cart.product}
              product={cart.product}
              baseQuantity={cart.quantity}
              basePrice={cart.price}
              addQuantity={quantity}
              addPrice={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ModifyQuotationItem = ({
  product,
  baseQuantity,
  basePrice,
  addQuantity,
  addPrice,
}) => {
  const [quantity, setQuantity] = React.useState(baseQuantity);
  const [price, setPrice] = React.useState(basePrice);
  const dispatch = useDispatch();

  const handleQuantity = event => {
    const newValue = event.target.value;
    dispatch(addQuantity({ product: product, quantity: newValue }));
    setQuantity(newValue);
  };

  const handlePrice = event => {
    const newValue = event.target.value;
    dispatch(addPrice(newValue));
    setPrice(newValue);
  };

  return (
    <div className="grid grid-cols-2 ml-24 mt-4 gap-5">
      <div className="flex gap-4 items-center">
        <div className="rounded-full w-6 h-6 border-4 border-sky-600" />
        <span className="text-lg font-semibold">{product}</span>
      </div>
      <div className="flex-shrink-0 w-1/5 justify-center items-center ">
        <input
          onChange={handleQuantity}
          value={quantity}
          type="number"
          className="w-80 lg:w-20 pl-4 h-9 bg-white rounded-md outline-none p-2 border-b-2 border-gray-400"
        />
      </div>
    </div>
  );
};

const ModuleShipment = ({
  title,
  number,
  arrive,
  source,
  status,
  fromSide,
  toSide,
}) => {
  return (
    <section className="flex flex-col w-full h-full gap-5">
      <span className="hidden lg:block font-semibold font-body text-xl ml-5">
        {title}
      </span>

      <div className="w-full h-full bg-white  shadow-base rounded-lg pb-5">
        <div className="w-full grid grid-cols-3 gap-5 pt-10 px-8">
          <ShipmentItem title="Bill of Lading number" data={number} />
          <ShipmentItem title="Estimated arrival date" data={arrive} />
          <ShipmentItem title="Source" data={source} />
          <ShipmentItem title="Status" data={status} />
          <ShipmentItem title="From" data={fromSide} />
          <ShipmentItem title="To" data={toSide} />
        </div>
      </div>
    </section>
  );
};

const ShipmentItem = ({ title, data }) => {
  return (
    <div className="flex flex-col w-full items-start gap-1 ">
      <span className="font-body font-semibold">{title}</span>
      <div className="flex w-full h-16 rounded-lg bg-sky-200 items-center justify-center">
        <span className="font-body font-bold text-2xl">{data}</span>
      </div>
    </div>
  );
};

const ModuleStatusShipment = ({ icon }) => {
  return (
    <section className="w-full h-full bg-white shadow-base rounded-lg p-8">
      <div className="flex gap-5 items-center">
        <div className="flex items-center justify-center w-20 h-20 bg-[#018aca] rounded-full">
          <Image className="w-12 h-12 object-cover" src={icon} alt="icon" />
        </div>
        <span className="text-xl font-body font-semibold">Ship</span>
      </div>
    </section>
  );
};

const ModuleSearchShipment = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full h-full">
      {data == [] ? (
        <section className="flex w-full h-full items-center justify-center bg-slate-800 shadow-base rounded-lg"></section>
      ) : (
        <section className="grid grid-cols-3 w-full h-full bg-white shadow-base rounded-lg p-12">
          <div className="flex flex-col gap-2">
            <span>Bill of landing</span>
            <span className="text-4xl font-semibold font-body pl-3">
              {data[0].billoflading}
            </span>
          </div>
          <div className="flex gap-5">
            <span>from:</span>
            <span className="text-xl font-semibold font-body">
              {data[0].pol}
            </span>
          </div>
          <div className="flex gap-5">
            <span>to:</span>
            <span className="text-xl font-semibold font-body">
              {data[0].pod}
            </span>
          </div>
          <div />
          <div className="flex flex-col">
            <span>Veessel</span>
            <span className="text-2xl font-semibold font-body pl-4">
              {data[0].vessel}
            </span>
          </div>
          <div className="flex flex-col">
            <span>Purpose</span>
            <span className="text-2xl font-semibold font-body pl-4">
              {data[0].purpose}
            </span>
          </div>
        </section>
      )}
    </div>
  );
};
export const modul = {
  ModuleWlg,
  ModuleWmd,
  ModuleWsm,
  ModuleHlg,
  ModuleHmd,
  ModuleColor,
  ModuleAdmin,
  ModuleChange,
  ModulePermissions,
  ModuleUserMod,
  ModuleOrderNameDetails,
  ModuleDivisionDetails,
  ModuleOrderNameModify,
  ModuleModify,
  ModuleUserModify,
  ModuleHAdmin,
  ModuleCart,
  ModuleOrderName,
  ModulePreview,
  ModuleReview,
  ModuleReviewCommercial,
  TotalCommercial,
  Divide,
  ModuleProforma,
  ModuleApproval,
  ModuleSupport,
  ModuleRequest,
  ModuleAccountable,
  ModuleDoc,
  ModuleModifyProforma,
  ModuleModifyQuote,
  ModuleShipment,
  ModuleStatusShipment,
  ModuleSearchShipment,
};
