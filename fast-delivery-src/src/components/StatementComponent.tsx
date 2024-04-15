"use client";
import React, { useEffect, useState } from "react";
import "../styles/box.css";
import IndividualStatement from "./IndividualStatement";
import { updateUser } from "@/services/dataUser";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import dataLogout from "@/services/dataLogout";
import { useAppSelector } from "@/redux/hooks";
import ArrowBack from "@/assets/ArrowBack";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user";

function StatementComponent() {
  const [formData, setFormData] = useState({
    alcohol: "",
    drugs: "",
    emotional: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleSubmit = async () => {
    setFormSubmitted(true);
    await validateForm();
  };

  const validateForm = async () => {
    if (formSubmitted) {
      if (formData.alcohol || formData.drugs || formData.emotional) {
        console.log("Se han detectado drogas o alcohol...");
        toast.warn("Lo siento, no puede comenzar su día de repartos.");
        try {
          await updateUser(user.id, { status: "Disabled" });
          await dataLogout();
          dispatch(
            setUser({
              id: null,
              email: "",
              name: "",
              last_name: "",
              role: "",
            })
          );

          router.push("/");
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("No se han detectado drogas ni alcohol...");
        toast.success(
          "¡Muchas gracias! Ya puede comenzar a repartir sus paquetes."
        );
        try {
          await updateUser(user.id, { status: "On Course" });
          dispatch(setUser({ ...user, status: "On Course" }));
          router.push("/get-packages");
        } catch (error) {
          console.error("Error enabling user:", error);
        }
      }
    }
  };
  useEffect(() => {
    console.log(user.status);
    if (user.status === "On Course") {
      router.push("/get-packages");
    }
    if (user.status !== "Free") {
      router.push("/get-packages");
    }
  }, []);

  return (
    <>
      {user.status === "Free" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "3.5rem",
          }}
        >
          <div className="headerBox">
            <div className="arrow-back">
              <ArrowBack onClick={() => router.back()} />
            </div>
            <div style={{ display: "flex", margin: "auto" }}>
              <p className="title">Declaración jurada</p>
            </div>
          </div>
          <div className="boxStatementStyle">
            <IndividualStatement
              content="¿Ha consumido bebidas alcohólicas en las últimas 12 horas?"
              type="alcohol"
              setFormData={setFormData}
            />
            <IndividualStatement
              content="¿Usted está haciendo uso de algún tipo de medicamento psicoactivo?"
              examples="por ejemplo tranquilizantes, antigripales, antialérgicos o para insomnio."
              type="drugs"
              setFormData={setFormData}
            />
            <IndividualStatement
              content="¿Tiene usted algún problema familiar, emocional o de cualquier tipo que lo distraiga?"
              type="emotional"
              setFormData={setFormData}
            />
            <button
              className="greenButton"
              style={{ marginTop: "30px" }}
              onClick={handleSubmit}
            >
              Continuar
            </button>
          </div>
          <ToastContainer
            position="top-right"
            transition={Zoom}
            autoClose={3000}
          />
        </div>
      ) : (
        router.push("/get-packages")
      )}
    </>
  );
}

export default StatementComponent;
