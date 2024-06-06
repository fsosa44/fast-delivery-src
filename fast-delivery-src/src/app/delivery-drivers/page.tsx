"use client";
import Navbar from "@/commons/Navbar";
import DeliveryDrivers from "@/components/DeliveryDrivers";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";
import Charging from "@/components/Charging";

function DeliveryDriversPage() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
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
          <DeliveryDrivers />
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
    </div>
  );
}

export default DeliveryDriversPage;
