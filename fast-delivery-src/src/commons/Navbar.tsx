"use client";
import React from "react";
import "../styles/navbar.css";
import AppIcon from "../assets/AppIcon";
import LogoutIcon from "../assets/LogoutIcon";
import dataLogout from "@/services/dataLogout";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user";
import { useAppSelector } from "@/redux/hooks";

function Navbar() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const clickLogout = async () => {
    try {
      await dataLogout();
      dispatch(
        setUser({
          id: null,
          email: "",
          name: "",
          last_name: "",
          role: "",
        })
      );
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <div className="navbar-container">
      {user.role === "Driver" ? (
        <>
          <span className="appIcon-container" onClick={() => router.push("/home-delivery")}>
            <AppIcon  />
          </span>
          <span className="logoutIcon-container" onClick={clickLogout}>
            <LogoutIcon />
          </span>
        </>
      ) : user.role === "Admin" ? (
        <>
          <span className="appIcon-container" onClick={() => router.push("/manage-orders")}>
            <AppIcon  />
          </span>
          <span className="logoutIcon-container" onClick={clickLogout}>
            <LogoutIcon />
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
