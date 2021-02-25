import React, { Component } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class CalendarPage extends Component {

    state = {
        events: [
        {
            start: moment().toDate(),
            end: moment()
            .add(1, "days")
            .toDate(),
            title: "Some title"
        }
        ]
    };

    render() {
        return (
            <div className="App">
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        );
    }
}

export default CalendarPage;