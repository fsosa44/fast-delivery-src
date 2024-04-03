"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../styles/box.css";
import "../styles/manageOrders.css";
import "../styles/buttons.css";
import "@/styles/avatar.css";
import CarrouselCalendar from "./CarrouselCalendar";
import { TfiPlus } from "react-icons/tfi";
import AdminPresentation from "./AdminPresentation";
import DetailsComponent from "./DetailsComponent";
import { useAppSelector } from "@/redux/hooks";

function ManageOrdersBox() {
  const router = useRouter();

  const handleClickNewPackage = () => {
    router.push("/add-package");
  };

  const user = useAppSelector((state) => state.user);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="headerBoxProfile">
        <div style={{ display: "flex", margin: "auto" }}>
          <p className="title">Gestionar Pedidos</p>
        </div>
      </div>
      <div
        className="boxRegisterStyle"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <AdminPresentation
          adminPic="/img/iconoProfile.jpg"
          adminName={user.name}
        />
        <div className="carrousel-calendar-container">
          <CarrouselCalendar />
        </div>
        <div className="details-container">
          <DetailsComponent />
        </div>
        <button
          className="greenButton"
          onClick={handleClickNewPackage}
          style={{ marginTop: "auto", marginBottom: "10px", fontSize: "12px" }}
        >
          Nuevo Paquete
          <TfiPlus
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default ManageOrdersBox;
