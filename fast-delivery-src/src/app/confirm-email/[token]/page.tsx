"use client";
import Charging from "@/components/Charging";
import VerifyAccount from "@/components/VerifyAccount";
import React, { useEffect, useState } from "react";

function ConfirmEmail() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return <div>{loading ? <Charging /> : <VerifyAccount />}</div>;
}

export default ConfirmEmail;
