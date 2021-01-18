import React from "react";

// eslint-disable-next-line import/order
import FullCalendar from "@fullcalendar/react"; // this import should be at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import PropTypes from "prop-types";

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: eventInfo.event.backgroundColor,
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
          whiteSpace: "normal",
        }}
      >
        {eventInfo.timeText}
        {" "}
        {eventInfo.event.title}
      </p>
    </>
  );
}

const EventCalendar = ({ events, onDayClick, onEventClick }) => (
  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    }}
    initialView="dayGridMonth"
    weekends
    events={events}
    eventContent={renderEventContent}
    dateClick={(arg) => onDayClick(arg.dateStr)}
    eventClick={(info) => onEventClick(info)}
  />
);

EventCalendar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      start_dt: PropTypes.string.isRequired,
      end_dt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventCalendar;
