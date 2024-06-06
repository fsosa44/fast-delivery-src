"use client";
import React, { useEffect, useState } from "react";
import "@/styles/homeDelivery.css";
import "@/styles/input.css";
import "@/styles/buttons.css";
import Navbar from "@/commons/Navbar";
import HomeDeliveryComponent from "@/components/HomeDeliveryComponent";
import { useAppSelector } from "@/redux/hooks";
import NotFound from "@/components/NotFound";
import Charging from "@/components/Charging";

function HomeDeliveryPage() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
      ) : user.role === "Driver" ? (
        <>
          <Navbar />
          <HomeDeliveryComponent />
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
          No puede acceder a esta pagina si no es repartidor.
        </h2>
      )}
    </div>
  );
}

export default HomeDeliveryPage;
