"use client";
import React, { useEffect, useState } from "react";
import "@/styles/buttons.css";
import "../styles/getPackages.css";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import CheckboxPackage from "@/commons/CheckboxPackage";
import {
  startDelivery,
  getAllPackages,
  getPackagesToday,
} from "@/services/dataPackages";
import { PackageProps } from "../../types";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

function GetpackageBox() {
  const [packages, setPackages] = useState<PackageProps[]>([]);
  const [tickedPackages, setTickedPackages] = useState<string[] | undefined[]>(
    []
  );
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

  const handleBackButton = () => {
    router.back();
  };

  useEffect(() => {
    getPackagesToday()
      .then((packages) => {
        const free = packages.filter(
          (freePackage: PackageProps) => freePackage.status === "Free"
        );
        setPackages(free);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleIniciarJornada = async () => {
    try {
      setTimeout(() => {
        startDelivery(tickedPackages, user.id);
        router.push("/home-delivery");
      }, 2000);
    } catch (error) {
      console.error("Error al iniciar la jornada", error);
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="headerBox">
        <ArrowBack onClick={handleBackButton} />
        <h1 className="title">Obtener paquetes</h1>
      </div>
      <div className="boxGetPackagesStyle">
        <h1 className="box-subtitle">¿Cuántos paquetes repartirás hoy?</h1>
        {packages.length === 0 ? (
          <h3
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Lo siento, no se han encontrado paquetes.
          </h3>
        ) : (
          ""
        )}

        <ul>
          {packages.map((individualPackage, index) => (
            <CheckboxPackage
              id={individualPackage.id}
              key={index}
              address={individualPackage.address}
              city={individualPackage.city}
              setTickedPackages={setTickedPackages}
              tickedPackages={tickedPackages}
              onClick={() =>
                router.push(`/delivery-map/${individualPackage.id}`)
              }
            />
          ))}
        </ul>
      </div>
      <div className="button-container">
        <button className="greenButton" onClick={handleIniciarJornada}>
          Iniciar Jornada
        </button>
      </div>
    </div>
  );
}

export default GetpackageBox;
