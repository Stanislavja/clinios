import React from "react";

// eslint-disable-next-line import/order
import FullCalendar from "@fullcalendar/react"; // this import should be at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import PropTypes from "prop-types";

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

const currentDate = moment().format("YYYY-MM-DD");
const oneYear = moment().add(365, "days").format("YYYY-MM-DD");

const EventCalendar = ({ events, onDayClick }) => (
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
    validRange={{
      start: currentDate,
      end: oneYear,
    }}
  />
);

EventCalendar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventCalendar;
