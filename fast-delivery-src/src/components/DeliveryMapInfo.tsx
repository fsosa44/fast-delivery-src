import React from "react";
import "@/styles/box.css";
import { PackageProps } from "../../types";

function DeliveryMapInfo({ address, id, client_name, city }: PackageProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="deliveryMapInfo">
        <p className="infoP" style={{ fontWeight: "bolder" }}>
          Destino: ​
        </p>
        <p className="infoP">{address}</p>
      </div>
      <div className="deliveryMapInfo">
        <p className="infoP" style={{ fontWeight: "bolder" }}>
          Número de paquete: ​
        </p>
        <p className="infoP">#{id}</p>
      </div>
      <div className="deliveryMapInfo">
        <p className="infoP" style={{ fontWeight: "bolder" }}>
          Recibe: ​
        </p>
        <p className="infoP">{client_name}</p>
      </div>
    </div>
  );
}

export default DeliveryMapInfo;
