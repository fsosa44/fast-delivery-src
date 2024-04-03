"use client";
import ArrowIcon from "@/assets/ArrowIcon";
import React, { useEffect, useState } from "react";
import "@/styles/details.css";
import "@/styles/buttons.css";
import DetailsElement from "@/commons/DetailsElement";
import CircularProgresss from "@/commons/CircularProgresss";
import Link from "next/link";
import { getAllUsers } from "@/services/dataUser";
import { getAllPackages } from "@/services/dataPackages";

type Package = {
  address: string;
  city: string;
  status: string;
};

type Users = {
  name: string;
  role: string;
  status: string;
};

function DetailsComponent() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<Package[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [freeUsers, setFreeUsers] = useState<Users[]>([]);
  const fechaActual = new Date();

  const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        const drivers = users.filter(
          (driverUser: Users) => driverUser.role === "Driver"
        );
        const freeDrivers = drivers.filter(
          (freeDriverUser: Users) =>
            freeDriverUser.status === "Free" ||
            freeDriverUser.status === "On Course"
        );
        setUsers(drivers);
        setFreeUsers(freeDrivers);
      })
      .catch((error) => {
        console.error(error);
      });
    getAllPackages()
      .then((packages) => {
        const delivered = packages.filter(
          (deliveredPackages: Package) =>
            deliveredPackages.status === "Delivered"
        );
        setPackages(packages);
        setDeliveredPackages(delivered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="details-container" className="detailsContainer">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="detailsName">Detalles</p>
          <div style={{ display: "flex", gap: "3px", margin: "auto 8px" }}>
            <p className="details-date">{fechaFormateada}</p>
            <ArrowIcon />
          </div>
        </div>
        <hr className="box-dotted-line2" />
        <div className="detailsContainer3">
          <DetailsElement
            title="Repartidores"
            cantidad={`${freeUsers.length}/${users.length} `}
            accion="Habilitados"
            percentage={
              <CircularProgresss
                percentage={
                  users.length !== 0
                    ? (freeUsers.length / users.length) * 100
                    : 0
                }
              />
            }
            button={
              <Link href="/delivery-drivers">
                <button className="detailsGreenButton">Ver</button>
              </Link>
            }
          />
          <hr className="box-dotted-line2" />
          <DetailsElement
            title="Paquetes"
            cantidad={`${deliveredPackages.length}/${packages.length} `}
            accion="Repartidos"
            percentage={
              <CircularProgresss
                percentage={
                  packages.length !== 0
                    ? (deliveredPackages.length / packages.length) * 100
                    : 0
                }
              />
            }
            button={
              <Link href="/packages-admin">
                <button className="detailsGreenButton">Ver</button>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsComponent;
