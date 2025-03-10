import { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import {
  STORE_OPENING_TIME,
  STORE_CLOSING_TIME,
  INTERVAL,
} from "../../constants/config";
import "./Calendar.css";

const Calendar = () => {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
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
  return (
    <div>
      {date.justDate ? (
        <div>
          {times?.map((time, i) => (
            <div key={`time-${i}`}>
              <button
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                type="button"
              >
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
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
