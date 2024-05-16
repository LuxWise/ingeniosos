import Desk from "@/layout/desk";
import Swal from "sweetalert2";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import { input } from "@/components/input";
import { button } from "@/components/button";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { useDropzone } from "react-dropzone";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { change } from "@/redux/features/authSlice.js";
import {
  addEmail,
  addLastName,
  addName,
  addTypeUser,
  removeUserStorage,
} from "@/redux/features/userSlice";

const NewQuote = () => {
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const dataUser = useSelector(state => state.user);
  const loading = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const onDrop = React.useCallback(acceptedFiles => {
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    ];

    const excelFiles = acceptedFiles.filter(file =>
      allowedTypes.includes(file.type)
    );

    if (excelFiles.length === 0) {
      Swal.fire("Error", "Please upload an Excel file", "error");
      return;
    }
    setUploadedFile(excelFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".xlsx"],
  });

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.get(`${URL}/format/users`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/xlsx" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "format.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  const handleUpload = () => {
    dispatch(change(true));

    if (!uploadedFile) {
      dispatch(change(false));
      Swal.fire("Error", "No file selected", "error");
      return;
    }
    axiosInstance
      .post(
        `${URL}/addUsers`,
        {
          excel: uploadedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        dispatch(change(false));
        Swal.fire("Success", "File uploaded successfully", "success").then(
          result => {
            router.push("/SuperAdmin/userManager/");
          }
        );
      })
      .catch(res => {
        dispatch(change(false));
      });
  };

  const handleCreateUser = async () => {
    dispatch(change(true));
    axiosInstance
      .post(`${URL}/addUser`, {
        name: dataUser.nameUser,
        lastname: dataUser.lastName,
        email: dataUser.email,
        typeUser: dataUser.typeUser,
      })
      .then(res => {
        dispatch(change(false));
        enqueueSnackbar("quote send", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
        setTimeout(() => {
          router.push("/SuperAdmin/userManager/");
        }, 1000);
        dispatch(removeUserStorage());
      })
      .catch(err => {
        dispatch(change(false));
      });
  };

  return (
    <Desk>
      <SnackbarProvider />
      <span className="font-semibold font-body text-4xl">Add user</span>
      <section className="flex justify-center w-11/12 mt-6 ml-8 gap-10">
        <div className="flex flex-col items-center gap-8 h-full w-full">
          <input.InputQuoteLg text="Name" add={addName} />
          <input.InputQuoteLg text="Lastname" add={addLastName} />
          <input.InputQuoteLg text="Email" add={addEmail} />
          <input.InputSelectLgValue
            text="Type of user"
            urldata="userRole"
            add={addTypeUser}
          />

          <button.ButtonSubmit
            text="Create user"
            log={loading.loading}
            onSubmit={handleCreateUser}
          />
        </div>
        <div className="w-2 rounded-full bg-[#024f72a2]" />

        <div className="flex flex-col items-center gap-8 h-full w-full">
          <modul.ModuleDoc
            text="Creation format"
            description="download format to create users"
            onSubmit={onSubmit}
          />
          <div
            {...getRootProps()}
            className="flex items-center justify-center w-full h-36 shadow-base bg-white rounded-lg"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <span className="font-normal font-body text-lg">
                Drop the file here...
              </span>
            ) : (
              <span className="font-normal font-body text-lg">
                Drag and drop an Excel file here
              </span>
            )}
          </div>
          <div className="flex w-full">
            <h3 className="text-lg font-bold">Uploaded file:</h3>
            <ul>{uploadedFile && <li>{uploadedFile.name}</li>} </ul>
          </div>
          <button.ButtonSubmit
            text="Create users"
            log={loading.loading}
            onSubmit={handleUpload}
          />
        </div>
      </section>
    </Desk>
  );
};

export default NewQuote;
