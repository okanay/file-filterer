import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const CalendarInput = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-fit rounded-md"
    />
  );
};
