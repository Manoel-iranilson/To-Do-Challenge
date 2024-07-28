import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dateFilter/datePickerStyles.css";
import { ptBR } from "date-fns/locale";

export default function DateFilter({ selectedDate, setSelectedDate }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Filtrar por data"
      dateFormat="dd/MM/yyyy"
      className="chakra-input"
      locale={ptBR}
    />
  );
}
