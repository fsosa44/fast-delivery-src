import React from "react";
import "@/styles/pswReq.css"

const PasswordRequirements = () => {
  return (
    <div className="container">
      <p className="title">Al menos</p>
      <div className="requirements">
        <li>8 caracteres</li>
        <li>1 mayúscula</li>
      </div>
      <div className="requirements">
        <li>1 minúscula</li>
        <li>1 número</li>
      </div>
    </div>
  );
};

export default PasswordRequirements;
