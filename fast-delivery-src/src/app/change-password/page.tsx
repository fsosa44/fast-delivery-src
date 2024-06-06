"use client";
import ChangePassword from "@/components/ChangePassword";
import Charging from "@/components/Charging";
import React, { useEffect, useState } from "react";

function ChangePasswordPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return <div>{loading ? <Charging /> : <ChangePassword />}</div>;
}

export default ChangePasswordPage;
