import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import SimpleDialog from "./simpleDialog";
import Card from "./card";

const startDate = new Date();
const actual = new Date();
startDate.setHours(startDate.getHours() + 5);

const startDate1 = new Date();
const actual1 = startDate1;
startDate1.setDate(startDate1.getDate() + 3);

const startDate2 = new Date();
const actual2 = startDate2;
startDate2.setDate(startDate2.getDate() + 2);

class UnusedCalendar extends Component {
  state = {
    calendarEvents: [
      // initial event data
      { title: "Money", start: actual, end: startDate },
      { title: "Monkey", start: actual1, end: startDate },
      { title: "Donkey", start: actual2, end: startDate }
    ],
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={this.state.calendarEvents}
          eventClick={info => {
            // info.jsEvent.preventDefault(); // don't let the browser navigate
            this.setState({ open: true });
          }}
        />
        <SimpleDialog
          open={this.state.open}
          onClose={this.handleClose}
          component={Card}
        />
      </React.Fragment>
    );
  }
}

export default UnusedCalendar;
