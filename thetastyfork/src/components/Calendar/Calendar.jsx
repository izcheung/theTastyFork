import { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import {
  STORE_OPENING_TIME,
  STORE_CLOSING_TIME,
  INTERVAL,
} from "../../constants/config";
import "./Calendar.css";

const Calendar = ({ onDateTimeChange, selectedDateTime }) => {
  const [date, setDate] = useState({
    justDate: selectedDateTime ? new Date(selectedDateTime) : null,
    dateTime: selectedDateTime ? new Date(selectedDateTime) : null,
  });

  console.log(date.dateTime);

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL;
    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();

  const handleDateSelect = (selectedDate) => {
    const newDate = new Date(selectedDate);
    setDate((prev) => ({ ...prev, justDate: newDate }));
  };

  const handleTimeSelect = (time) => {
    const updatedDateTime = new Date(date.justDate); // Use selected date
    updatedDateTime.setHours(time.getHours(), time.getMinutes()); // Set the selected time
    setDate((prev) => ({ ...prev, dateTime: updatedDateTime }));
    onDateTimeChange(updatedDateTime); // Pass the updated dateTime to parent
  };

  return (
    <div>
      {date.justDate ? (
        <div>
          {times?.map((time, i) => (
            <div key={`time-${i}`}>
              <button onClick={() => handleTimeSelect(time)} type="button">
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          className="react-calendar"
          minDate={new Date()}
          view="month"
          onClickDay={handleDateSelect}
          value={date.justDate}
        />
      )}
    </div>
  );
};

export default Calendar;
