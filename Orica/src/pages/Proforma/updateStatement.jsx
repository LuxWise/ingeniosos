import React from "react";
import Desk from "@/layout/desk";
import axiosInstance from "@/axiosInstance";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { button } from "@/components/button";
import { change } from "@/redux/features/authSlice.js";
import { URL } from "@/constans/constans";

const SubirArchivos = () => {
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const loading = useSelector(state => state.auth);
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

  const handleUpload = () => {
    dispatch(change(true));

    if (!uploadedFile) {
      dispatch(change(false));
      Swal.fire("Error", "No file selected", "error");
      return;
    }
    axiosInstance
      .post(
        `${URL}/xlsx`,
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
        Swal.fire("Success", "File uploaded successfully", "success");
      })
      .catch(res => {
        dispatch(change(false));
      });
  };

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          Statement of account
        </span>
      </div>
      <section className="flex flex-col justify-center items-center w-full mt-10 gap-5">
        <div
          {...getRootProps()}
          className="flex items-center justify-center dropzone w-full h-36 shadow-md border-t-2 shadow-sky-400 rounded-lg"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <span className="font-normal font-body text-xl">
              Drop the file here...
            </span>
          ) : (
            <span className="font-normal font-body text-xl">
              Drag and drop an Excel file here, or click to select
            </span>
          )}
        </div>

        <button.ButtonSubmit
          text="Update"
          onSubmit={handleUpload}
          log={loading.loading}
        />
        <div className="flex w-full">
          <h3 className="text-lg font-bold">Uploaded file:</h3>
          <ul>{uploadedFile && <li>{uploadedFile.name}</li>} </ul>
        </div>
      </section>
    </Desk>
  );
};

export default SubirArchivos;
