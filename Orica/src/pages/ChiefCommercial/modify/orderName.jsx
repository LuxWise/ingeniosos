import Swal from "sweetalert2";
import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { button } from "@/components/button";
import { URL } from "@/constans/constans";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import {
  addDivideSelect,
  setPortSelect,
} from "@/redux/features/orderNameSlice";
import { useRouter } from "next/router";

const ModifyOrderName = () => {
  const [data, setData] = React.useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const dividSelect = useSelector(state => state.orderName);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const isMounted = React.useRef(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isMounted.current) {
      axiosInstance
        .get(`${URL}/divisions`)
        .then(res => {
          dispatch(setPortSelect(true));
          setData(res.data);
        })
        .catch(err => console.log(err));

      axiosInstance
        .get(
          `${URL}/ordernameDivisionsDetails/${dividSelect.orderNameDetails.id}`
        )
        .then(res => {
          dispatch(addDivideSelect(res.data));
        })
        .catch(err => console.log(err));

      isMounted.current = true;
    }
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

  const onSubmit = () => {
    Swal.fire({
      text: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(res => {
      axiosInstance
        .put(`${URL}/ordername`, {
          name: dividSelect.orderNameDetails.id,
          divides: dividSelect.divideSelectId,
        })
        .then(res => router.push("/ChiefCommercial/orderName/"))
        .catch(err => console.log(err));
    });
  };

  const onAdd = () => {
    dispatch(addDivideSelect(rowSelectionModel));
  };

  return (
    <Desk>
      <span className="font-semibold font-body text-4xl">
        Modify Order Name "{dividSelect.orderNameDetails.id}"
      </span>
      <section className="flex justify-center items-center w-full mt-6  gap-10">
        <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
          <div className="flex flex-col items-center justify-center gap-5 w-full h-full mt-10">
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
              text="Save and modify"
              log={loading.loading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>
    </Desk>
  );
};

export default ModifyOrderName;
