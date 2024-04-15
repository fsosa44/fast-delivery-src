"use client";
import React, { FormEvent, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../styles/box.css";
import "../styles/input.css";
import "../styles/buttons.css";
import InputText from "@/commons/InputText";
import InputEmail from "@/commons/InputEmail";
import InputPassword from "@/commons/InputPassword";
import CameraAddIcon from "../assets/CameraAddIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import dataRegister from "@/services/dataRegister";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordRequirements from "@/commons/PasswordRequirements";

function CreateAccountBox() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.info("Debes completar todos los campos");
    } else if (formData.password != formData.confirmPassword) {
      toast.info("Las contraseñas no coinciden");
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      formData.password.length < 8
    ) {
      toast.info("Contraseña inválida");
    } else {
      try { 
        toast.loading("Registrando...");
        await dataRegister(formData);
        toast.dismiss();
        toast.success(
          "¡Registro realizado correctamente! Verifica tu correo electrónico"
        );
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error(error);
        toast.error("Error al registrar el usuario");
      }
      setFormData({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="headerBox">
        <ArrowBack onClick={handleBackButton} />
        <div style={{ display: "flex", margin: "auto" }}>
          <p className="title">Creá tu cuenta</p>
        </div>
      </div>
      <div className="boxRegisterStyle">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <button>
            <div
              style={{
                width: "95px",
                height: "95px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #3d1df3",
                borderRadius: "100px",
              }}
            >
              <CameraAddIcon />
            </div>
          </button>
        </div>
        <form className="formContainer" onSubmit={onSubmit}>
          <InputText
            className="inputWhite"
            placeholder="Nombre"
            name="name"
            value={formData.name}
            disabled={false}
            onChange={handleChange}
          />
          <InputText
            className="inputWhite"
            placeholder="Apellido"
            name="last_name"
            value={formData.last_name}
            disabled={false}
            onChange={handleChange}
          />
          <InputEmail
            className="inputWhite"
            placeholder="Email"
            name="email"
            value={formData.email}
            disabled={false}
            onChange={handleChange}
          />
          <InputPassword
            className="inputWhite"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            disabled={false}
            onChange={handleChange}
          />
          {formData.password.length >= 1 ? <PasswordRequirements /> : ""}
          <InputPassword
            className="inputWhite"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            disabled={false}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "20px",
              marginBottom: "5px",
            }}
          >
            <button className="greenButton">Crear</button>
            <button className="link2">¿Ya tenés una cuenta?</button>
            <Link href="/">
              <button className="transparentButton2">Iniciar Sesión</button>
            </Link>
            <ToastContainer
              position="top-right"
              transition={Zoom}
              autoClose={3000}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountBox;
