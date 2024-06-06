import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const CLAVE_API_GOOGLE_MAPS = `${process.env.GOOGLE_MAPS_API_KEY}`;

type MapProps = {
  address: string | undefined;
};

function InitMap({ address }: MapProps) {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();
        setCenter({ lat: latitude, lng: longitude });
        console.log(center);
      } else {
        console.error("No se pudo encontrar la ubicación:", status);
      }
    });
  }, [address]);

  if (!center) {
    return (
      <div style={{ color: "#3d1df3", display: "flex", margin: "auto" }}>
        Cargando...
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={CLAVE_API_GOOGLE_MAPS}>
      <GoogleMap center={center} zoom={10}>
        {/* Aquí puedes agregar más elementos como marcadores, polígonos, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}

export default InitMap;
