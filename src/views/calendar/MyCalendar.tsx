import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export const MyCalendar = () => {
  const myEventsList = [
    {
      title: "Complete The Figma Design",
      start: new Date(2023, 11, 1),
      end: new Date(2023, 11, 3),
    },
    {
      title: "Town Hall meeting",
      start: new Date(2023, 12, 7),
      end: new Date(2023, 12, 10),
    },
  ];

  return (
    <div className={"p-5"}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
