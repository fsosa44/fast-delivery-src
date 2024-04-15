"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import ArrowIcon from "@/assets/ArrowIcon";
import TrashIcon from "@/assets/TrashIcon";
import "../styles/box.css";
import "../styles/init.css";
import "../styles/buttons.css";
import AccordionPackageItem from "./AccordionPackageItem";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { changeStatus, getPackagesByDriver } from "@/services/dataPackages";
import { getUserById } from "@/services/dataUser";
import { useRouter } from "next/navigation";

type PendingDistributionsProps = {
  onClick: () => void;
};

type Package = {
  address: string;
  city: string;
  package_code: string;
  status: string;
  driver_id: number;
  id: string | undefined;
  delivery_date: string;
};

function PendingDeliveries({ onClick }: PendingDistributionsProps) {
  const [openSection, setOpenSection] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);

  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  const handleClick = () => {
    setOpenSection(openSection === 1 ? 0 : 1);
    onClick();
  };

  useEffect(() => {
    const fetchUserAndPackages = async () => {
      try {
        const currentURL = window.location.href;
        if (currentURL) {
          const urlParts = currentURL.split("/");
          if (urlParts && urlParts.length > 0) {
            const userId = urlParts[urlParts.length - 1];
            const fetchedUser = await getUserById(userId);
            if (fetchedUser.status === 404) {
              router.push("/404");
              return;
            }
            getPackagesByDriver(userId)
              .then((packages) => {
                const delivered = packages.filter(
                  (pendingPackage: Package) =>
                    pendingPackage.status === "Pending"
                  || pendingPackage.status === "On Course"
                );
                setPackages(delivered);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error("No se pudo dividir la URL");
          }
        } else {
          console.error("No se pudo obtener la URL actual");
        }
      } catch (error) {
        console.error("Error al obtener el repartidor solicitado:", error);
      }
    };
    fetchUserAndPackages();
  }, [router]);

  const handleInitDeliver = async () => {
    try {
      toast.success("¡Felicitaciones! Ya puede ir a repartir su paquete.");
      setTimeout(() => {
        changeStatus(4, "On Course");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(`Error al iniciar el reparto del paquete`, error);
      setTimeout(() => {
        toast.error("¡Lo siento! No puede ir a repartir su paquete.");
      }, 2000);
    }
  };

  const handleDeletePackage = async () => {
    try {
      toast.info("Paquete eliminado correctamente");
      setTimeout(() => {
        changeStatus(5, "Free");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(`Error al eliminar el paquete`, error);
      setTimeout(() => {
        toast.error("Error al eliminar el paquete");
      }, 2000);
    }
  };

  const handleClickPackage = () => {};
  return (
    <div className="accordion-box-top">
      <div className="box-title" onClick={handleClick}>
        <h1>Repartos Pendientes</h1>
        <ArrowIcon />
      </div>

      {(openSection === 1 || openSection === 3) && (
        <>
          {packages.length === 0 ? (
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Lo siento, no se han encontrado paquetes.
            </h3>
          ) : (
            ""
          )}
          <ul>
            {packages.map((individualPackage, index) => (
              <AccordionPackageItem
                onClick={handleClickPackage}
                key={index}
                id={individualPackage.id}
                address={individualPackage.address}
                city={individualPackage.city}
                delivery_date={individualPackage.delivery_date}
                tags={
                  individualPackage.status === "On Course"
                    ? "course"
                    : "pending"
                }
                tagContent={
                  individualPackage.status === "On Course"
                    ? "En curso"
                    : "Pendiente"
                }
                additionalElement={
                  individualPackage.status === "On Course" ? (
                    <TrashIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleDeletePackage}
                    />
                  ) : (
                    <button
                      className="greenButtonSmall"
                      onClick={handleInitDeliver}
                    >
                      iniciar
                    </button>
                  )
                }
              />
            ))}
            <ToastContainer
              position="top-right"
              transition={Zoom}
              autoClose={2000}
            />
          </ul>
        </>
      )}
    </div>
  );
}

export default PendingDeliveries;
