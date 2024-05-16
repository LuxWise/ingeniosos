import Box from "@mui/material/Box";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { setQoute } from "@/redux/features/quoteSlice";
import { URL } from "@/constans/constans";
import { addTaxes, addTotal } from "@/redux/features/proformaSlice";
import { setUserInfo } from "@/redux/features/userSlice";
import { setOrderNameDetails } from "@/redux/features/orderNameSlice";
import { setDivideDetails } from "@/redux/features/divideSlice";
import {
  addPreview,
  removePreview,
  setNumber,
} from "@/redux/features/previewSlice";

const CreateTable = ({ data, columns }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: 350,
        width: "100%",
        height: "362px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(setQoute(params.row));
          dispatch(setNumber(params.row.id));
        }}
      />
    </Box>
  );
};

const CreateTableMd = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  const onSelect = idQuote => {
    axiosInstance
      .get(`${URL}/${type}/${idQuote}`)
      .then(res => {
        res.data.forEach(product => {
          dispatch(
            addPreview({
              id: product.id,
              product: product.product,
              quantity: product.quantity,
              price: product.price,
            })
          );
        });
      })
      .catch();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "362px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
          },
          "& .status--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(addTotal(params.row.total));
          dispatch(addTaxes(params.row.taxes));
          dispatch(setQoute(params.row));
          dispatch(removePreview());
          dispatch(setNumber(params.row.id));
          onSelect(params.row.id);
        }}
      />
    </Box>
  );
};

const CreateTableLg = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  const onSelect = idQuote => {
    axiosInstance
      .get(`${URL}/${type}/${idQuote}`)
      .then(res => {
        res.data.forEach(product => {
          dispatch(
            addPreview({
              product: product.product,
              quantity: product.quantity,
              price: product.price,
            })
          );
        });
      })
      .catch();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "470px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={7}
        pageSizeOptions={[7, 10, 20]}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 7 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
          },
          "& .status--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(addTotal(params.row.total));
          dispatch(addTaxes(params.row.taxes));
          dispatch(setQoute(params.row));
          dispatch(removePreview());
          dispatch(setNumber(params.row.id));
          onSelect(params.row.id);
        }}
      />
    </Box>
  );
};

const CreateTableAccountStatement = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "470px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={7}
        pageSizeOptions={[7, 10, 20]}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 7 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
          },
          "& .status--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {}}
      />
    </Box>
  );
};

const CreateTableUser = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  const onSelect = idQuote => {
    axiosInstance
      .get(`${URL}/${type}/${idQuote}`)
      .then(res => {
        res.data.forEach(product => {
          dispatch(
            addPreview({
              product: product.product,
              quantity: product.quantity,
              price: product.price,
            })
          );
        });
      })
      .catch();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "510px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={8}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#fff",
            justifyContent: "center",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          "& .status--cell": {
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(setUserInfo(params.row));
        }}
      />
    </Box>
  );
};

const CreateTableDetails = ({ data, columns }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: 350,
        width: "100%",
        height: "450px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          borderRadius: "15px",
        }}
      />
    </Box>
  );
};

const CreateTableChecklist = ({ data, columns, setRow, exclude }) => {
  const dispatch = useDispatch();
  const datafilter = data.filter(item => !exclude.includes(item.id));

  const handleRowSelectionChange = newSelection => {
    const selectedRows = newSelection.map(id => {
      return datafilter.find(row => row.id === id);
    });
    console.log(selectedRows);
    setRow(selectedRows);
  };

  return (
    <Box
      sx={{
        height: 350,
        width: "100%",
        height: "310px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={datafilter}
        pageSize={4}
        pageSizeOptions={[4, 8, 12]}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 4 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          borderRadius: "15px",
        }}
      />
    </Box>
  );
};

const CreateTableOrderName = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "510px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={8}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          "& .status--cell": {
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(setOrderNameDetails(params.row));
        }}
      />
    </Box>
  );
};

const CreateTableDision = ({ data, columns, type }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "510px",
        borderRadius: "15px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75);",
      }}
    >
      <DataGrid
        getRowHeight={() => 50}
        rows={data}
        pageSize={8}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        sx={{
          "& .id--cell": {
            backgroundColor: "#0284c7",
            justifyContent: "center",
            color: "#ffffff",
          },
          "& .theme--cell": {
            justifyContent: "center",
          },
          "& .status--cell": {
            justifyContent: "center",
            color: "#41af43",
            fontWeight: 600,
          },
          borderRadius: "15px",
        }}
        onRowClick={(params, event) => {
          dispatch(setDivideDetails(params.row));
        }}
      />
    </Box>
  );
};

export const table = {
  CreateTable,
  CreateTableMd,
  CreateTableLg,
  CreateTableAccountStatement,
  CreateTableUser,
  CreateTableDetails,
  CreateTableChecklist,
  CreateTableOrderName,
  CreateTableDision,
};
