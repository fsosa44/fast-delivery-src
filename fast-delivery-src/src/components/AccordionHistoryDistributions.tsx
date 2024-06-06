"use client";
import React, { useEffect, useState } from "react";
import "@/styles/homeDelivery.css";
import "@/styles/input.css";
import "@/styles/buttons.css";
import AccordionPackageItem from "./AccordionPackageItem";
import ArrowIcon from "@/assets/ArrowIcon";
import { PackageProps } from "../../types";
import { getPackagesByDriver } from "@/services/dataPackages";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

type AccordionHistoryDistributionsProps = {
  onClick: () => void;
};

function AccordionHistoryDistributions({
  onClick,
}: AccordionHistoryDistributionsProps) {
  const [openSection, setOpenSection] = useState(0);
  const [packages, setPackages] = useState<PackageProps[]>([]);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const handleClick = () => {
    setOpenSection(openSection === 1 ? 0 : 1);
    onClick();
  };

  useEffect(() => {
    getPackagesByDriver(user.id)
      .then((packages) => {
        const delivered = packages.filter(
          (pendingPackage: PackageProps) =>
            pendingPackage.status === "Delivered"
        );
        setPackages(delivered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
                onClick={() =>
                  router.push(`/delivery-map/${individualPackage.id}`)
                }
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

export default AccordionHistoryDistributions;
