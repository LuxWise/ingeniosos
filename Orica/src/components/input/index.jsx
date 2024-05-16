import React, { useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "@/axiosInstance";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";

const InputLog = ({ text, input, value }) => {
  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col max-md:w-10/12 w-2/6">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <input
          type={text}
          className=" w-full pl-4 h-11 bg-[#c6dfe7] rounded-xl outline-none p-2"
          value={value}
          onChange={e => input(e.target.value)}
        />
      </div>
    </section>
  );
};

const InputQuoteLg = ({ text, add, value }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    dispatch(add(inputValue));
  }, [inputValue, dispatch, add]);

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
    dispatch(add(newValue));
  };

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <input
          type="text"
          className="w-full pl-4 h-11 bg-white rounded-lg outline-none p-2 shadow-base"
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </section>
  );
};

const InputQuoteXl = ({ text, input, add, value }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState(value);

  useEffect(() => {
    setInputValue(value);
    dispatch(add(value));
  }, [value, dispatch, add]);

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
    dispatch(add(newValue));
  };

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <textarea
          type="text"
          className="w-full pl-4 h-20 bg-white rounded-lg outline-none p-2 shadow-base"
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </section>
  );
};

const InputQuote2Xl = ({ text, input, add }) => {
  const dispatch = useDispatch();
  const handleChange = event => {
    const newValue = event.target.value;
    dispatch(add(newValue));
  };

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <textarea
          type={text}
          className="w-full pl-4 h-[268px] bg-white rounded-lg outline-none p-2 shadow-base"
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

const InputSelectMd = ({ text, add, urldata }) => {
  const [options, setOptions] = React.useState();
  const dispatch = useDispatch();

  const handleChange = option => {
    dispatch(add(option.label));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance(`${URL}/${urldata}`);
      const data = result.data.map(item => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(data);
    };
    fetchData();
  }, [urldata]);

  return (
    <section className="flex flex-col">
      <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
        {text}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={options}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: 180,
            border: 0,
            boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
            borderRadius: "10px",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "back" : "black",
            backgroundColor: state.isFocused ? "#61afef" : "white",
          }),
        }}
      />
    </section>
  );
};

const InputSelectLgValue = ({ text, add, urldata, lastname, initialValue }) => {
  const [options, setOptions] = React.useState();
  const [selectedOption, setSelectedOption] = React.useState(null);
  const dispatch = useDispatch();

  const handleChange = option => {
    console.log(option);
    dispatch(add(option.value));
  };

  useEffect(() => {
    axiosInstance.get(`${URL}/${urldata}`).then(res => {
      const result = res.data.map(item => ({
        value: item.id,
        label: lastname ? item.name + " " + item.lastname : item.name,
      }));
      setOptions(result);
      const defaultOption = result.find(item => item.value === initialValue);
      if (defaultOption) {
        setSelectedOption(defaultOption);
      }
    });
  }, [urldata]);

  return (
    <section className="flex flex-col w-full">
      <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
        {text}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={options}
        value={selectedOption}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%",
            border: 0,
            boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
            borderRadius: "10px",
            padding: 4,
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "back" : "black",
            backgroundColor: state.isFocused ? "#61afef" : "white",
          }),
        }}
      />
    </section>
  );
};

const InputSelectLg = ({ text, add, urldata }) => {
  const [options, setOptions] = React.useState();
  const dispatch = useDispatch();

  const handleChange = option => {
    dispatch(add(option.label));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance(`${URL}/${urldata}`);
      const data = result.data.map(item => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(data);
    };
    fetchData();
  }, [urldata]);

  return (
    <section className="flex flex-col w-full">
      <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
        {text}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={options}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%",
            border: 0,
            boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
            borderRadius: "10px",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "back" : "black",
            backgroundColor: state.isFocused ? "#61afef" : "white",
          }),
        }}
      />
    </section>
  );
};

const InputQuantity = ({ text, add }) => {
  const dispatch = useDispatch();
  const handleChange = event => {
    const newValue = event.target.value;
    dispatch(add(newValue));
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <input
          onChange={handleChange}
          type="number"
          className=" w-80 lg:w-32 pl-4 h-9 bg-white rounded-lg outline-none p-2 shadow-base"
        />
      </div>
    </div>
  );
};

const InputPrice = ({ text, add, priceBase }) => {
  const [price, setprice] = React.useState(priceBase);
  const dispatch = useDispatch();

  const handleChange = event => {
    const newValue = event.target.value;
    setprice(newValue);
    dispatch(add(newValue));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <span className="text-lg font-body font-semibold">{text}</span>
        <input
          onChange={handleChange}
          type="number"
          value={price}
          className=" w-80 lg:w-32 pl-4 h-9 bg-white rounded-lg outline-none p-2 shadow-base"
        />
      </div>
    </div>
  );
};

const InputChat = ({ text, add, priceBase }) => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.chat.message);

  const handleChange = event => {
    const newValue = event.target.value;
    dispatch(add(newValue));
  };

  return (
    <textarea
      placeholder="What is your question?"
      className=" w-full h-full bg-slate-300 outline-none rounded-md p-1"
      onChange={handleChange}
      value={message ?? ""}
    />
  );
};

const InputDivide = ({ text, add, initialValue, typeofdata }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState(initialValue);

  React.useEffect(() => {
    initialValue && dispatch(add(initialValue));
  }, [dispatch, initialValue, add]);

  const type = {
    text: "text",
    number: "number",
    date: "date",
  };

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
    dispatch(add(newValue));
  };

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full">
        <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
          {text}
        </label>
        <input
          type={type[typeofdata]}
          className="w-full pl-4 h-8 bg-[#38bdf8] rounded-lg outline-none p-2 shadow-base"
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </section>
  );
};

const InputSelectDivide = ({ text, add, urldata, initialValue }) => {
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const dispatch = useDispatch();

  const handleChange = option => {
    setSelectedOption(option);
    dispatch(add(option.value));
  };

  useEffect(() => {
    axiosInstance.get(`${URL}/${urldata}`).then(res => {
      const result = res.data.map(item => ({
        value: item.id,
        label: item.port,
      }));
      setOptions(result);
      const defaultOption = result.find(item => item.value === initialValue);
      if (defaultOption) {
        setSelectedOption(defaultOption);
        dispatch(add(defaultOption.value));
      }
    });
  }, [urldata, dispatch, initialValue, add]);

  return (
    <section className="flex flex-col w-full">
      <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
        {text}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={options}
        value={selectedOption}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%",
            border: 0,
            boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
            borderRadius: "10px",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "back" : "black",
            backgroundColor: state.isFocused ? "#61afef" : "white",
          }),
        }}
      />
    </section>
  );
};

const InputSelectLgPort = ({ text, add, urldata, value, initialValue }) => {
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const dispatch = useDispatch();

  const handleChange = option => {
    setSelectedOption(option);
    value ? dispatch(add(option.value)) : dispatch(add(option.label));
  };

  useEffect(() => {
    axiosInstance.get(`${URL}/${urldata}`).then(res => {
      const result = res.data.map(item => ({
        value: item.id,
        label: item.port,
      }));
      setOptions(result);
      const defaultOption = result.find(item => item.value === initialValue);
      if (defaultOption) {
        setSelectedOption(defaultOption);
        dispatch(add(defaultOption.value));
      }
    });
  }, [urldata, dispatch, add]);

  return (
    <section className="flex flex-col w-full">
      <label className="ml-4 mb-2 text-md text-black font-semibold text-softtext">
        {text}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={options}
        value={selectedOption}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%",
            border: 0,
            boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
            borderRadius: "10px",
            padding: 4,
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "back" : "black",
            backgroundColor: state.isFocused ? "#61afef" : "white",
          }),
        }}
      />
    </section>
  );
};

export const input = {
  InputLog,
  InputQuoteLg,
  InputQuoteXl,
  InputQuote2Xl,
  InputSelectMd,
  InputSelectLg,
  InputQuantity,
  InputSelectLgValue,
  InputPrice,
  InputChat,
  InputDivide,
  InputSelectDivide,
  InputSelectLgPort,
};
