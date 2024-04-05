import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/es";
import "@/styles/input.css";
import "@/assets/ArrowIcon";
import ArrowIcon from "@/assets/ArrowIcon";
import { format } from "date-fns";

type PackageData = {
  address: string;
  client_name: string;
  weight: string;
  delivery_date: string;
};

type DatePickerProps = {
  className: string;
  placeholder: string;
  name: string;
  setData: React.Dispatch<React.SetStateAction<PackageData>>;
  data: PackageData;
};
const InputDatePicker: React.FC<DatePickerProps> = ({
  className,
  placeholder,
  name,
  data,
  setData,
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const pickerRef = useRef<flatpickr.Instance | undefined>(undefined);

  useEffect(() => {
    const inputElement = document.getElementById(
      name || ""
    ) as HTMLInputElement;

    const picker = flatpickr(inputElement, {
      enableTime: false,
      dateFormat: "d/m/y",
      defaultDate: selectedDate,
      minDate: "today",
      locale: "es",
      disable: [
        function (date) {
          return date.getDay() === 6 || date.getDay() === 0;
        },
      ],
      onChange: (selectedDates) => {
        if (selectedDates && selectedDates.length > 0) {
          const newSelectedDate = selectedDates[0];
          setSelectedDate(newSelectedDate);
          const formattedDate = format(newSelectedDate, "yyyy-MM-dd");
          setData({ ...data, [name]: formattedDate });
        }
      },
      onClose: () => {
        setOpenCalendar(false);
      },
    });

    pickerRef.current = picker;

    return () => {
      picker.destroy();
    };
  }, [name, selectedDate, data]);

  const handleArrowButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pickerRef.current) {
      if (openCalendar) {
        pickerRef.current.close();
        setOpenCalendar(false);
      } else {
        pickerRef.current.open();
        setOpenCalendar(true);
      }
    }
  };
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (pickerRef.current) {
      if (openCalendar) {
        pickerRef.current.close();
        setOpenCalendar(false);
      } else {
        pickerRef.current.open();
        setOpenCalendar(true);
      }
    }
  };
  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          id={name}
          name={name}
          className={className}
          placeholder={placeholder}
          value={selectedDate ? selectedDate.toLocaleDateString("es-ES") : ""} // Mostrar la fecha seleccionada en el input
          data-input
          onClick={handleInputClick}
        />
        <button className="arrow-container" onClick={handleArrowButtonClick}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default InputDatePicker;
