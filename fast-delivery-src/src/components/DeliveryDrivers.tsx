"use client";
import React, { useEffect, useState } from "react";
import "../styles/deliveryDrivers.css";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import "../styles/init.css";
import "@/styles/avatar.css";
import SeeMoreArrow from "@/assets/SeeMoreArrow";
import CalendarComponent from "./CalendarComponent";
import Avatar from "@/commons/Avatar";
import CircularProgresss from "@/commons/CircularProgresss";
import DeliveryDriverCommon from "@/commons/DeliveryDriverCommon";
import { getAllUsers } from "@/services/dataUser";
import { getPackagesByDriver } from "@/services/dataPackages";
import Link from "next/link";

type Users = {
  name: string;
  role: string;
  status: string;
  id: number | null;
};

type Package = {
  address: string;
  city: string;
  package_code: string;
  status: string;
  driver_id: Number | null;
};

function DeliveryDrivers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<Package[]>([]);
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        const drivers = users.filter(
          (driverUser: Users) => driverUser.role === "Driver"
        );
        setUsers(drivers);

        Promise.all(
          drivers.map((driver: Users) => {
            return getPackagesByDriver(driver.id)
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
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}
    >
      <div className="header-box">
        <div className="arrow-back">
          <ArrowBack onClick={handleBackButton} />
        </div>
        <h1 className="header-box-title">Repartidores</h1>
      </div>
      <div className="white-box">
        <CalendarComponent />
        <div className="drivers-container">
          {users.length === 0 ? (
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Lo siento, no se han encontrado repartidores.
            </h3>
          ) : (
            ""
          )}
          <ul>
            {users.map((user, index) => (
              <DeliveryDriverCommon
                onClick={() => router.push(`/delivery-profile/${user.id}`)}
                key={index}
                driverName={user.name}
                tags={
                  user.status === "On Course"
                    ? "free"
                    : user.status === "Disabled"
                    ? "disabled"
                    : user.status === "Inactive"
                    ? "inactive"
                    : user.status === "Free"
                    ? "free"
                    : ""
                }
                tagContent={
                  user.status === "On Course"
                    ? "Habilitado"
                    : user.status === "Disabled"
                    ? "Deshabilitado"
                    : user.status === "Inactive"
                    ? "Inactivo"
                    : user.status === "Free"
                    ? "Habilitado"
                    : ""
                }
                percentage={
                  <CircularProgresss
                    percentage={
                      packages.length
                        ? (deliveredPackages.length / packages.length) * 100
                        : 0
                    }
                  />
                }
                avatar={
                  <Avatar
                    src="/img/iconoUsers2.png"
                    className="distributors-stats-avatar"
                  />
                }
              />
            ))}
          </ul>
        </div>
        <div className="see-more-arrow-container">
          <SeeMoreArrow />
        </div>
      </div>
    </div>
  );
}

export default DeliveryDrivers;
