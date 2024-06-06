"use client";
import Navbar from "@/commons/Navbar";
import DeliveryProfile from "@/components/DeliveryProfile";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import NotFound from "@/components/NotFound";
import Charging from "@/components/Charging";

const DeliveryProfilePage = () => {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  return (
    <>
      {loading ? (
        <Charging />
      ) : !user.id ? (
        <h2
          style={{
            color: "white",
            fontFamily: "Poppins",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <NotFound />
        </h2>
      ) : user.role === "Admin" ? (
        <>
          <Navbar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DeliveryProfile />
          </div>
        </>
      ) : (
        <h2
          style={{
            color: "white",
            fontFamily: "Poppins",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No puede acceder a esta pagina si no es administrador.
        </h2>
      )}
    </>
  );
};

export default DeliveryProfilePage;
