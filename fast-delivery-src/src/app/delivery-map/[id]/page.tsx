"use client";
import Navbar from "@/commons/Navbar";
import DeliveryMapBox from "@/components/DeliveryMapBox";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import NotFound from "@/components/NotFound";
import { useRouter } from "next/navigation";
import Charging from "@/components/Charging";

function DeliveryMapPage() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [user.id, router]);

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
          <DeliveryMapBox />
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

export default DeliveryMapPage;
