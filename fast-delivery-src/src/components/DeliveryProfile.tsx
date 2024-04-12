"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/box.css";
import "../styles/switch.css";
import "../styles/buttons.css";
import "@/styles/init.css";
import "@/styles/avatar.css";
import "@/components/PendingDeliveries";
import "@/components/DeliveriesHistory";
import iconoProfile from "../../public/img/iconoProfile.jpg";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/ArrowBack";
import { getUserById, updateUser } from "@/services/dataUser";
import DeliveriesHistory from "@/components/DeliveriesHistory";
import PendingDeliveries from "@/components/PendingDeliveries";

type User = {
  id: number | undefined;
  name: string;
  last_name: string;
  role: string;
  status: string;
};

const DeliveryProfile = () => {
  const [openSection, setOpenSection] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [userStatus, setUserStatus] = useState("Free");

  const handleBackButton = () => {
    router.back();
  };

  const handleAccordionClick = () => {
    setOpenSection(openSection === 1 ? 0 : 1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentURL = window.location.href;
        if (currentURL) {
          const urlParts = currentURL.split("/");
          if (urlParts && urlParts.length > 0) {
            const userId = urlParts[urlParts.length - 1];
            const fetchedUser = await getUserById(userId);
            if (fetchedUser.status === 404) {
              router.push("/404");
            }
            setUser(fetchedUser.data);
            setIsChecked(
              fetchedUser.data.status === "Free" ||
                fetchedUser.data.status === "On Course"
                ? true
                : false
            );
          } else {
            console.error("No se pudo dividir la URL");
          }
        } else {
          console.error("No se pudo obtener la URL actual");
        }
      } catch (error) {
        console.error("Error al obtener el repartidor solicitado:", error);
      }
    };
    fetchUser();
  }, [router]);

  const handleSwitchChange = async () => {
    try {
      if (isChecked) {
        await updateUser(user?.id, { status: "Disabled" });
        setIsChecked(false);
        setUserStatus("Disabled");
        window.location.reload();
      } else {
        await updateUser(user?.id, { status: "Free" });
        setIsChecked(true);
        setUserStatus("Free");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al cambiar el estado del repartidor:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "3.5rem",
      }}
    >
      <div className="headerBoxProfile">
        <ArrowBack onClick={handleBackButton} />
        <div style={{ margin: "auto" }}>
          <h1 className="title">Perfil del repartidor</h1>
        </div>
      </div>
      <div className="boxDeliveryProfileStyle">
        <div style={{ width: "25%" }}>
          <Image
            src={iconoProfile}
            alt="Profile-Image"
            width={56}
            height={56}
            style={{
              borderRadius: "50%",
              margin: "",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            marginLeft: "15px",
          }}
        >
          <h1 className="deliveryName">{`${user?.name} ${user?.last_name}`}</h1>
          <span
            style={{
              width: "fit-content",
              height: "15px",
              borderRadius: "20px",
              color: "#3D1DF3",
              fontSize: "10px",
              fontWeight: "600",
              textTransform: "uppercase",
              padding: "0 10px",
              textAlign: "center",
            }}
            className={user?.status === "Disabled" ? "disabled" : user?.status === "Unvalidated" ? "disabled" : "free"}
          >
            {user?.status === "Disabled"
              ? "Deshabilitado"
              : user?.status === "On Course"
              ? "Habilitado"
              : user?.status === "Free"
              ? "Habilitado"
              : user?.status === "Unvalidated"
              ? "Deshabilitado"
              : ""}
          </span>
        </div>
        <label className="switch" style={{ right: "0", top: "18px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitchChange}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <PendingDeliveries onClick={handleAccordionClick} />
        <DeliveriesHistory onClick={handleAccordionClick} />
      </div>
    </div>
  );
};
export default DeliveryProfile;
