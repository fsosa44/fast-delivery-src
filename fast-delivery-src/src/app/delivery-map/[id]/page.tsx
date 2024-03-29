"use client";
import Navbar from "@/commons/Navbar";
import DeliveryMapBox from "@/components/DeliveryMapBox";
import React, { useEffect, useState } from "react";
import LoginPage from "../../login/page";
import { useAppSelector } from "@/redux/hooks";
import NotFound from "@/components/NotFound";
import { useRouter } from "next/navigation";
import Charging from "@/components/Charging";

function page() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!user.id) {
      setTimeout(() => {
        router.push("/404");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
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

export default page;
