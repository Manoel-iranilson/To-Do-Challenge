/* eslint-disable react/prop-types */
import { format, getDay, parse, startOfWeek } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getStatus } from "../../utils/getStatus";

const locales = {
  "pt-BR": pt,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Event = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    <br />
    <small>{event.subTitle}</small>
  </span>
);

export default function CalendarTasks({ tasks, setIdTask, onOpen }) {
  const eventsByTasks = useMemo(() => {
    const events = tasks.map((task) => ({
      id: task.id,
      title: task.name,
      subTitle: getStatus(task),
      start: new Date(task.taskDate),
      end: new Date(task.taskDate),
    }));
    console.log("Events by tasks:", events);
    return events;
  }, [tasks]);

  const handleSelected = (event) => {
    setIdTask(event.id);
    onOpen();
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "";
    switch (event.subTitle) {
      case "Concluída":
        backgroundColor = "green";
        break;
      case "Pendente (Atrasada)":
        backgroundColor = "red";
        break;
      case "Pendente":
      default:
        backgroundColor = "orange";
        break;
    }
    return { style: { backgroundColor } };
  };

  return (
    <div style={{ height: "730px" }}>
      <Calendar
        localizer={localizer}
        events={eventsByTasks}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week"]}
        onSelectEvent={handleSelected}
        popup
        culture="pt-BR"
        defaultView="month"
        eventPropGetter={eventPropGetter}
        components={{
          event: Event,
        }}
      />
    </div>
  );
}
