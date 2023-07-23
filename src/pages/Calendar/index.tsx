import { Component, onMount } from "solid-js";
import { ExtremeCalendar } from "../../components/extreme-calendar/ExtremeCalendar"
import { initFlowbite } from "flowbite";

const CalendarPage: Component = () => {
    onMount(() => {
        initFlowbite();
    });

    const events = {
        "2023-07-12": [
            { title: 'hello', time: '8:00', description: 'Something' },
            { title: 'hello2', description: 'Something' },
            { title: 'hello3', description: 'Something' },
            { title: 'hello4', time: '10:00', description: 'Something' },
            { title: 'hello5', description: 'Something' },
        ]
    };
    return (
        <div class="p-4 bg-white block border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p><ExtremeCalendar from="2023-07-01" to="2023-07-31" events={events} /></p>
        </div>
    )
}

export default CalendarPage;