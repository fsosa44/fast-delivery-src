"use client";
import React, { useEffect, useState } from "react";
import "@/styles/statement.css";
import StatementComponent from "@/components/StatementComponent";
import { useAppSelector } from "@/redux/hooks";
import LoginPage from "../login/page";
import NotFound from "@/components/NotFound";
import Navbar from "@/commons/Navbar";
import Charging from "@/components/Charging";

function statement() {
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
      ) : user.role === "Driver" ? (
        <>
          {" "}
          <Navbar />
          <StatementComponent />
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

export default statement;
