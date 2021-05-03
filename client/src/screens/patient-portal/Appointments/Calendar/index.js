import React from "react";

// eslint-disable-next-line import/order
import FullCalendar from "@fullcalendar/react"; // this import should be at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import PropTypes from "prop-types";
import "./calendar.css";

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: eventInfo.event.backgroundColor,
          borderColor: eventInfo.event.backgroundColor,
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
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
      left: "title",
      center: "",
      right: "prev next",
    }}
    initialView="dayGridMonth"
    weekends
    events={events}
    eventContent={renderEventContent}
    dateClick={(arg) => onDayClick(arg.dateStr)}
    eventClick={(info) => onEventClick(info)}
    selectable
  />
);

EventCalendar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventCalendar;
