import Swal from "sweetalert2";
import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { URL } from "@/constans/constans";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import {
  addDivideSelect,
  deleteOrderStroge,
  setName,
  setPort,
  setPortSelect,
} from "@/redux/features/orderNameSlice";
import { useRouter } from "next/router";

const NewOrderName = () => {
  const [data, setData] = React.useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const port = useSelector(state => state.orderName.port);
  const portSelect = useSelector(state => state.orderName.portSelect);
  const dividSelect = useSelector(state => state.orderName);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPortSelect(false));
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Customer",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];

  const onSelect = () => {
    rowSelectionModel.length > 0 &&
      dispatch(addDivideSelect(rowSelectionModel));
    axiosInstance
      .get(`${URL}/divisionsPort/${port}`)
      .then(res => {
        dispatch(setPortSelect(true));
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  const onSubmit = () => {
    Swal.fire({
      text: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .post(`${URL}/ordername`, {
            name: dividSelect.nameOrder,
            divides: dividSelect.divideSelectId,
          })
          .then(res => {
            enqueueSnackbar("Order created", {
              autoHideDuration: 2000,
              style: {
                backgroundColor: "#028bca",
                fontWeight: "500",
                borderRadius: "7px",
              },
            });
            setTimeout(() => {
              router.push("/Commercial/orderName/");
            }, 1000);
            dispatch(deleteOrderStroge());
          })
          .catch(err => console.log(err));
        close();
      }
    });
  };

  const onAdd = () => {
    dispatch(addDivideSelect(rowSelectionModel));
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">
        Create Order Name
      </span>
      <section className="flex justify-center w-full mt-6  gap-10">
        <div className="flex flex-col items-center gap-8 h-full w-full">
          <div className="flex items-end w-full gap-10">
            <input.InputQuoteLg text="Order Name " add={setName} />
            <div className="flex w-full items-end gap-5">
              <input.InputSelectLgPort
                text="Port"
                add={setPort}
                urldata="/ports"
                value={true}
              />
              <button.ButtonAdd text="select" onSubmit={onSelect} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
            <div className="grid grid-cols-12 w-full gap-5 h-full">
              <div className="col-span-8 h-full">
                <table.CreateTableChecklist
                  data={data}
                  columns={columns}
                  setRow={setRowSelectionModel}
                  exclude={dividSelect.divideSelectId}
                />
              </div>
              <div className=" col-span-4 flex flex-col justify-center items-center gap-3 ">
                <modul.ModuleOrderName />

                <button.ButtonAdd text="add" onSubmit={onAdd} />
              </div>
            </div>

            <button.ButtonSubmit
              text="Save and confirm"
              log={loading.loading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default NewOrderName;
