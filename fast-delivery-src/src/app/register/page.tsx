"use client";
import Charging from "@/components/Charging";
import CreateAccountBox from "@/components/CreateAccountBox";
import React, { useEffect, useState } from "react";

function Register() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return <div>{loading ? <Charging /> : <CreateAccountBox />}</div>;
}

export default Register;
