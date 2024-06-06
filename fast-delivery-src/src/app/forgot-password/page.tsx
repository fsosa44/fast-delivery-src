"use client";
import Charging from "@/components/Charging";
import SendMailChangePsw from "@/components/SendMailChangePsw";
import React, { useEffect, useState } from "react";

function ForgotPassword() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return <div>{loading ? <Charging /> : <SendMailChangePsw />}</div>;
}

export default ForgotPassword;
