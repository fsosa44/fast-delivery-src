"use client";
import InputText from "@/commons/InputText";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../styles/box.css";
import "../styles/input.css";
import "../styles/buttons.css";
import "../styles/addPackages.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputDatePicker from "@/commons/InputDatePicker";
import ArrowBack from "@/assets/ArrowBack";
import { createPackage } from "@/services/dataPackages";

type PackageData = {
  address: string;
  client_name: string;
  weight: string;
  delivery_date: string;
};

function AddPackagesBox() {
  const [formData, setFormData] = useState<PackageData>({
    address: "",
    client_name: "",
    weight: "",
    delivery_date: "",
  });

  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.address ||
      !formData.client_name ||
      !formData.delivery_date ||
      !formData.weight
    ) {
      toast.warn("Debes completar todos los campos");
      console.log(formData);
    } else {
      try {
        const response = await createPackage(formData);
        toast.success("Paquete agregado correctamente");
        setFormData({
          address: "",
          client_name: "",
          weight: "",
          delivery_date: new Date().toISOString().slice(0, 10),
        });
      } catch (error) {
        console.error("Error al agregar el paquete:", error);
        toast.error("Error al agregar el paquete");
      }
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="headerBoxProfile">
        <ArrowBack onClick={handleBackButton} />
        <div style={{ display: "flex", margin: "auto" }}>
          <p className="title">Agregar paquetes</p>
        </div>
      </div>
      <div
        className="boxRegisterStyle"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form className="formAddPackages" onSubmit={onSubmit}>
          <div className="inputsContainer">
            <InputText
              className="inputWhite"
              placeholder="Dirección"
              name="address"
              value={formData.address}
              disabled={false}
              onChange={handleChange}
            />
            <InputText
              className="inputWhite"
              placeholder="Nombre de quien recibe"
              name="client_name"
              value={formData.client_name}
              disabled={false}
              onChange={handleChange}
            />
            <InputText
              className="inputWhite"
              placeholder="Peso del paquete (Kg)"
              name="weight"
              value={formData.weight}
              disabled={false}
              onChange={handleChange}
            />
          </div>
          <hr className="box-dotted-line" />
          <h1 className="box-subtitle2">Fecha de entrega</h1>
          <div className="inputsContainer">
            <InputDatePicker
              className="inputWhite"
              placeholder="00/00/00"
              name="delivery_date"
              data={formData}
              setData={setFormData}
            />
          </div>
          <div className="buttonSubmitContainer">
            <button type="submit" className="greenButton">
              Agregar
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          transition={Zoom}
          autoClose={3000}
        />
      </div>
    </div>
  );
}

export default AddPackagesBox;
