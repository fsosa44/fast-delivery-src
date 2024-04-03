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

function StatementComponent() {
  const [formData, setFormData] = useState({
    alcohol: "",
    drugs: "",
    emotional: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleSubmit = async () => {
    setFormSubmitted(true); // Marcar el formulario como enviado
    validateForm();
  };

  const validateForm = () => {
    if (formSubmitted) {
      if (formData.alcohol || formData.drugs || formData.emotional) {
        console.log("Se han detectado drogas o alcohol...");
        toast.warn("Lo siento, no puede comenzar su día de repartos.");
        updateUser(user.id, { status: "Disabled" })
          .then(() => {
            setTimeout(() => {
              dataLogout()
                .then(() => {
                  router.push("/");
                })
                .catch((error) => console.error(error));
            }, 2000);
          })
          .catch((error) => console.error(error));
      } else if (!formData.alcohol && !formData.drugs && !formData.emotional) {
        console.log("No se han detectado drogas ni alcohol...");
        toast.success(
          "¡Muchas gracias! Ya puede comenzar a repartir sus paquetes."
        );
        updateUser(user.id, { status: "On Course" })
          .then(() => {
            setTimeout(() => {
              router.push("/get-packages");
            }, 2000);
          })
          .catch((error) => console.error("Error enabling user:", error));
      }
    }
  };
  useEffect(() => {
    console.log(user.status);
    if (user.status === "On Course") {
      router.push("/home-delivery");
    }
  }, [user.status]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
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
      <ToastContainer position="top-right" transition={Zoom} autoClose={3000} />
    </div>
  );
}

export default StatementComponent;
