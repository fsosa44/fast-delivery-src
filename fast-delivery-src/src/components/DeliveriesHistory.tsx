"use client";
import React, { useEffect, useState } from "react";
import "../styles/init.css";
import "../styles/input.css";
import "../styles/buttons.css";
import BoxIcon from "@/assets/BoxIcon";
import ArrowIcon from "@/assets/ArrowIcon";
import AccordionPackageItem from "./AccordionPackageItem";
import { useAppSelector } from "@/redux/hooks";
import { getPackagesByDriver } from "@/services/dataPackages";
import { getUserById } from "@/services/dataUser";
import { useRouter } from "next/navigation";

type HistoryDistributionsProps = {
  onClick: () => void;
};
type Package = {
  address: string;
  city: string;
  package_code: string;
  status: string;
  driver_id: Number | null;
  id: string | undefined;
};

function DeliveriesHistory({ onClick }: HistoryDistributionsProps) {
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
                  (deliveredPackage: Package) =>
                    deliveredPackage.status === "Delivered"
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
  const handleClickPackage = () => {};
  return (
    <div className="accordion-box-top">
      <div className="box-title" onClick={handleClick}>
        <h1>Historial de repartos</h1>
        <ArrowIcon />
      </div>

      {(openSection === 1 || openSection === 3) && (
        <>
          <h3
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#3D1DF3",
            }}
          >
            {packages.length} paquetes entregados
          </h3>
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
                tags={
                  individualPackage.status === "Delivered" ? "delivered" : ""
                }
                tagContent={
                  individualPackage.status === "Delivered" ? "Entregado" : ""
                }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DeliveriesHistory;
