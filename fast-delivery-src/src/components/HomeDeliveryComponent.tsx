"use client";
import React, { useEffect, useState } from "react";
import AccordionPendingDistributions from "./AccordionPendingDistributions";
import AccordionHistoryDistributions from "./AccordionHistoryDistributions";
import "@/styles/homeDelivery.css";
import "@/styles/input.css";
import "@/styles/buttons.css";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

function HomeDeliveryComponent() {
  const [openSection, setOpenSection] = useState(0);

  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  const handleAccordionClick = () => {
    setOpenSection(openSection === 1 ? 0 : 1);
  };

  const handleGetPackagesClick = () => {
    if (user.status === "Free") {
      router.push("/statement");
    } else if (user.status === "On Course") {
      router.push("/get-packages");
    }
  };

  return (
    <div className="accordion">
      <AccordionPendingDistributions onClick={handleAccordionClick} />
      <AccordionHistoryDistributions onClick={handleAccordionClick} />
      <button className="greenButton" onClick={handleGetPackagesClick}>
        Obtener Paquetes
      </button>
    </div>
  );
}

export default HomeDeliveryComponent;
