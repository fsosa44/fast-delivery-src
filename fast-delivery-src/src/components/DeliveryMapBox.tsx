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
      await changeStatus(deliveryInfo?.id, "Delivered");
      toast.success("Paquete entregado.");
      setTimeout(() => {
        router.push("/home-delivery");
      }, 1500);
    } catch (error) {
      console.error(`Error al entregar el paquete`, error);
      toast.error("¡Lo siento! No se puede entregar su paquete.");
    }
  };

  const handleStartDelivery = async () => {
    try {
      await changeStatus(deliveryInfo?.id, "On Course");
      toast.success("Ya puede ir a repartir su paquete.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al iniciar el reparto del paquete`, error);
      toast.error("¡Lo siento! No puede ir a repartir su paquete.");
    }
  };

  const handleCancelDelivery = async () => {
    try {
      await changeStatus(deliveryInfo?.id, "Free");
      toast.info("Reparto Cancelado.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al cancelar el reparto del paquete`, error);
      toast.error("¡Lo siento! No puede cancelar su reparto.");
    }
  };

  const handleSelectPackage = async () => {
    try {
      await startDelivery([deliveryInfo?.id], user.id);
      toast.success("Paquete Seleccionado.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error al seleccionar el paquete`, error);
      toast.error("¡Lo siento! No puede seleccionar el paquete.");
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
