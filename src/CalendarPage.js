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

        console.log(calendarItem)
        return {
            eventName: calendarItem.name,
            startDate: new Date(calendarItem.startDate),
            stopDate: new Date(calendarItem.stopDate),
        }
        
    })
    console.log(calendarResults)

    // To obtain the eventName out of calendarResults, I need to select the [array]
    // TODO: Find a way to be able to correctly select the calendarResults!

    const state = {
        events: [
            {
                start: calendarResults.startDate,
                end: calendarResults.stopDate,
                title: calendarResults.eventName,
            }
        ]
    }


    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={state.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
    
}

export default CalendarPage;