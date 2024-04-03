"use client";
import React, { useEffect, useState } from "react";
import "@/styles/packagesAdmin.css";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import "../styles/init.css";
import TrashIcon from "@/assets/TrashIcon";
import SeeMoreArrow from "@/assets/SeeMoreArrow";
import CalendarComponent from "./CalendarComponent";
import AccordionPackageItem from "./AccordionPackageItem";
import {
  deletePackage,
  getAllPackages,
  getPackagesToday,
} from "@/services/dataPackages";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Package = {
  address: string;
  city: string;
  package_code: string;
  status: string;
  driver_id: number;
  id: string | undefined;
};

function PackagesAdmin() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);

  const handleBackButton = () => {
    router.back();
  };

  useEffect(() => {
    getPackagesToday()
      .then((packages) => {
        setPackages(packages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeletePackage = async () => {
    try {
      toast.info("Paquete eliminado correctamente");
      setTimeout(() => {
        deletePackage(5);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar el paquete:", error);
      setTimeout(() => {
        toast.error("Error al eliminar el paquete");
      }, 2000);
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="header-box">
        <div className="arrow-back">
          <ArrowBack onClick={handleBackButton} />
        </div>
        <h1 className="header-box-title">Paquetes</h1>
      </div>
      <div className="white-box">
        <div className="date-container">
          <CalendarComponent />
        </div>

        <div className="package-amount">{`${packages.length} paquetes`}</div>
        <div className="accordion-container">
          {packages.map((individualPackage, index) => (
            <AccordionPackageItem
              onClick={() =>
                router.push(`/delivery-map/${individualPackage.id}`)
              }
              key={index}
              id={individualPackage.id}
              address={individualPackage.address}
              city={individualPackage.city}
              additionalElement={
                <TrashIcon
                  style={{ marginBottom: "17px", cursor: "pointer" }}
                  onClick={handleDeletePackage}
                />
              }
            />
          ))}
        </div>
        <div className="see-more-arrow-container">
          <SeeMoreArrow />
        </div>
      </div>
      <ToastContainer position="top-right" transition={Zoom} autoClose={2000} />
    </div>
  );
}

export default PackagesAdmin;
