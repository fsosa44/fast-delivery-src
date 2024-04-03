import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import "@/styles/deliveryDrivers.css";

interface CircularProgressProps {
  percentage: number;
}

function CircularProgresss(props: CircularProgressProps) {
  // Validación de la prop 'percentage'
  CircularProgress.propTypes = {
    percentage: PropTypes.number.isRequired,
  };
  const formattedPercentage = Math.min(100, Math.max(0, props.percentage))
    .toString()
    .slice(0, 4);

  return (
    <div>
      <CircularProgress value={props.percentage} size="71px" color="green.400">
        <CircularProgressLabel>{`${formattedPercentage}%`}</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
}

export default CircularProgresss;
