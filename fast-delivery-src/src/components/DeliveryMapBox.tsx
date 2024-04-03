"use client";
import React, { useEffect, useState } from "react";
import "../styles/box.css";
import "../styles/input.css";
import "../styles/buttons.css";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import DeliveryMapInfo from "./DeliveryMapInfo";
import {
  changeStatus,
  getPackageById,
  startDelivery,
} from "@/services/dataPackages";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/hooks";
import { PackageProps } from "../../types";

function DeliveryMapBox() {
  const router = useRouter();
  const [deliveryInfo, setDeliveryInfo] = useState<PackageProps>({
    client_name: "",
    address: "",
    id: "",
    status: "",
    city: "",
  });

  const handleBackButton = () => {
    router.back();
  };

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const currentURL = window.location.href;
        if (currentURL) {
          const urlParts = currentURL.split("/");
          if (urlParts && urlParts.length > 0) {
            const packageId = urlParts[urlParts.length - 1];
            const fetchedPackage = await getPackageById(packageId);
            if (fetchedPackage.status === 404) {
              router.push("/404");
            }
            setDeliveryInfo(fetchedPackage.data);
          } else {
            console.error("No se pudo dividir la URL");
          }
        } else {
          console.error("No se pudo obtener la URL actual");
        }
      } catch (error) {
        console.error("Error al obtener el paquete solicitado:", error);
      }
    };
    fetchPackage();
  }, [router]);

  const handleEndDelivery = async () => {
    try {
      toast.success("Paquete entregado.");
      setTimeout(() => {
        changeStatus(deliveryInfo?.id, "Delivered");
        router.push("/home-delivery");
      }, 1500);
    } catch (error) {
      console.error(`Error al entregar el paquete`, error);
      setTimeout(() => {
        toast.error("¡Lo siento! No se puede entregar su paquete.");
      }, 1500);
    }
  };

  const handleStartDelivery = async () => {
    try {
      toast.success("Ya puede ir a repartir su paquete.");
      setTimeout(() => {
        changeStatus(deliveryInfo?.id, "On Course");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al iniciar el reparto del paquete`, error);
      setTimeout(() => {
        toast.error("¡Lo siento! No puede ir a repartir su paquete.");
      }, 1500);
    }
  };

  const handleCancelDelivery = async () => {
    try {
      toast.info("Reparto Cancelado.");
      setTimeout(() => {
        changeStatus(deliveryInfo?.id, "Free");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al cancelar el reparto del paquete`, error);
      setTimeout(() => {
        toast.error("¡Lo siento! No puede cancelar su reparto.");
      }, 1500);
    }
  };

  const handleSelectPackage = async () => {
    try {
      toast.success("Paquete Seleccionado.");
      setTimeout(() => {
        startDelivery([deliveryInfo?.id], user.id);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al seleccionar el paquete`, error);
      setTimeout(() => {
        toast.error("¡Lo siento! No puede seleccionar el paquete.");
      }, 1500);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="headerBox">
        <ArrowBack onClick={handleBackButton} />
        <div style={{ display: "flex", margin: "auto" }}>
          <h1 className="title">Reparto en curso</h1>
        </div>
      </div>

      <div className="boxDeliveryMapStyle">
        <div className="mapContainer"></div>
        <DeliveryMapInfo
          address={deliveryInfo?.address}
          id={deliveryInfo.id}
          client_name={deliveryInfo?.client_name}
          city={deliveryInfo?.city}
        />
        {deliveryInfo?.status === "Delivered" ? (
          <p
            style={{
              display: "flex",
              marginTop: "8%",
              justifyContent: "center",
            }}
          >
            Paquete entregado
          </p>
        ) : deliveryInfo?.status === "On Course" ? (
          <button
            className="greenButton"
            style={{ marginTop: "30px" }}
            onClick={handleEndDelivery}
          >
            Finalizar
          </button>
        ) : deliveryInfo?.status === "Pending" ? (
          <button
            className="greenButton"
            style={{ marginTop: "30px" }}
            onClick={handleStartDelivery}
          >
            Repartir
          </button>
        ) : deliveryInfo?.status === "Free" ? (
          <button
            className="greenButton"
            style={{ marginTop: "30px" }}
            onClick={handleSelectPackage}
          >
            Seleccionar Paquete
          </button>
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "flex", margin: "15px auto" }}>
        {deliveryInfo?.status === "On Course" ? (
          <button className="transparentButton1" onClick={handleCancelDelivery}>
            Cancelar entrega
          </button>
        ) : deliveryInfo?.status === "Pending" ? (
          <button className="transparentButton1" onClick={handleCancelDelivery}>
            Cancelar entrega
          </button>
        ) : (
          ""
        )}
      </div>
      <ToastContainer position="top-right" transition={Zoom} autoClose={2000} />
    </div>
  );
}

export default DeliveryMapBox;
