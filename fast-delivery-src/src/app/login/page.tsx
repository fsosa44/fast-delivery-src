"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/Logo";
import Login from "@/components/Login";
import Charging from "@/components/Charging";

function LoginPage() {
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
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10rem auto",
          }}
        >
          <Logo />
          <div
            style={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
