import React from "react";
import "@/styles/homeDelivery.css";
import "@/styles/buttons.css";
import BoxIcon from "@/assets/BoxIcon";

type PackageItemProps = {
  id: string | undefined;
  address: string;
  city: string;
  tags?: string;
  delivery_date?: string;
  tagContent?: string;
  additionalElement?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function AccordionPackageItem({
  id,
  address,
  city,
  tags,
  delivery_date,
  additionalElement,
  tagContent,
  onClick,
}: PackageItemProps) {

  const formatSpanishDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };

  return (
    <div className="package-item">
      <div className="box-icon-info-container" style={{cursor: "pointer"}} onClick={onClick}>
        <BoxIcon />
        <div >
          <h1 className="package-code">#{id}</h1>
          <h2 className="package-direction">{address},</h2>
          <h2 className="package-direction">{city}</h2>
          <h3 className="delivery-date">{formatSpanishDate(delivery_date)}</h3>
        </div>
      </div>
      <div className="tags-container">
        <p className={`tags ${tags}`}>{tagContent}</p>
        {/* {additionalElement && <div>{additionalElement}</div>} */}
      </div>
    </div>
  );
}

export default AccordionPackageItem;
