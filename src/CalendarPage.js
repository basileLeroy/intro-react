import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const LOCAL_STORAGE_KEY = 'todoApp.todos';
const localizer = momentLocalizer(moment);

const CalendarPage = () => {

    //TODO: Change the system from localestorage usage to component values between eachother

    const [calendarItems, setCalendar] = useState([]);

    useEffect(() => {
        // Can't read strings, need to parse with JSON
        const StoredCalendar = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (StoredCalendar) setCalendar(StoredCalendar)
        //array is empty so that it only loads once.
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calendarItems))
    }, [calendarItems]);

    // Read map as a foreach!
    const calendarResults = calendarItems.map((calendarItem) => {

        
        // Foreach here?
        return {
            
            id: calendarItem.id,
            eventName: calendarItem.name,
            startDate: calendarItem.startDate,
            stopDate: calendarItem.stopDate,
        }
    })
    console.log(calendarResults)

    // To obtain the eventName out of calendarResults, I need to select the [array]
    // TODO: Find a way to be able to correctly select the calendarResults!

    const Allevents = []
    calendarResults.forEach(calendarResult => {
        Allevents.push(
            {
                start: calendarResult.startDate,
                end: calendarResult.stopDate,
                title: calendarResult.eventName,
            }
        )
    });

    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={Allevents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}

export default CalendarPage;