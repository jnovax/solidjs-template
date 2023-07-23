import * as dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/vi';
import { Match, Switch, createSignal } from 'solid-js';
import "./ExtremeCalendar.css";
import clsx from 'clsx';

dayjs.extend(localeData);
dayjs.locale('vi');

const MAX_NO_EVENTS = 3;
const firstDayOfWeek = dayjs.localeData().firstDayOfWeek();
const lastDayOfWeek = firstDayOfWeek == 0 ? 7 : firstDayOfWeek - 1;

const ViewMoreEventLink = (props) => {
    const { events, day } = props;
    return (<>
        <a href="#" class="text-blue-600 underline dark:text-blue-500 hover:no-underline" data-popover-target="popover-default">
            thêm {events.length} sự kiện
        </a>
        <div data-popover id="popover-default" role="tooltip" class="ExCalendarPopup_Header absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Extra events for {day.format('D/MMM')}</h3>
            </div>
            <div class="px-3 py-2">
                <For each={events}>{(evt) =>
                    <CalendarEvent {...evt} />
                }</For>
            </div>
            <div data-popper-arrow></div>
        </div></>
    )
}

const CalendarEvent = (props) => {
    const { title, time, description } = props;

    if (time) {
        const formatedTime = dayjs(`1970-00-00 ${time}`).format('Ha');
        return (
            <a class='TimeEvent' title={formatedTime + ": " + description ?? title}>
                <span>{formatedTime}</span>
                <span>{title}</span>
            </a>)
    }
    else {
        return (
            <a class='DayEvent' title={description ?? title}>
                <span>{title}</span>
            </a>)
    }
}

const CalendarDay = (props) => {
    const { events, day, from, to } = props;
    const formatedDate = (day.date() == 1) ? day.format('D/M') : day.format('D');

    let displayEvents = events;
    let otherEvents = [];
    if (events?.length > MAX_NO_EVENTS) {
        displayEvents = events?.slice(0, MAX_NO_EVENTS - 1);
        otherEvents = events?.slice(MAX_NO_EVENTS - 1);
    }

    const isHoliday = (day.day() == 6 || day.day() == 0);
    const isToday = dayjs().isSame(day, "date");

    return <div class={clsx({ Day: true, holiday: isHoliday, today: isToday, col: true }, "border border-gray-200")}>
        <div classList={{
            'text-end': true,
            disabled: day.isBefore(from, 'day') || day.isAfter(to, 'day'),
        }}>
            {formatedDate}
        </div>
        <For each={displayEvents}>{(evt) =>
            <CalendarEvent {...evt} />
        }</For>
        <Show when={otherEvents.length}>
            <ViewMoreEventLink events={otherEvents} day={day} />
        </Show>
    </div>
}

const CalendarWeek = (props) => {
    const { days, events, ...others } = props;

    return (
        <div class={'Week grid grid-cols-7'}>
            <For each={days}>{(day) =>
                <CalendarDay day={day} events={events[day.format('YYYY-MM-DD')]} {...others} />
            }</For>
        </div>
    )
}

const CalendarHeader = () => {
    function titleCase(string) {
        const sentence = string.toLowerCase().split(" ");
        for (let i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ");
    }

    let weekdays = dayjs.localeData().weekdays();

    if (firstDayOfWeek > 0) {
        weekdays = [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];
    }

    return (
        <div class={'Header grid grid-cols-7 font-medium uppercase dark:text-white text-sky-600 bg-gray-100 dark:bg-gray-700'}>
            <For each={weekdays}>{(weekday) =>
                <div class="text-center font-bold border border-gray-300 dark:text-gray-200 dark:border-gray-200">{titleCase(weekday)}</div>
            }</For>
        </div>
    )
}

/**
 * Yet another full calendar
 * Pass [from] and [to], then you got it done :D
 */
export const ExtremeCalendar = (props) => {
    let { from, to } = props;
    if (from) {
        from = dayjs(from).startOf('week');
    }
    else {
        props.from = dayjs().startOf('month');
        from = props.from.startOf('week');
    }

    if (to) {
        to = dayjs(to).endOf('week');
    }
    else {
        props.to = dayjs().endOf('month');
        to = props.to.endOf('week');
    }

    const [error, setError] = createSignal();

    if (from.isAfter(to, 'day') || from.isSame(to, 'day')) {
        setError(`[from] must less than [to]`);
    }

    const weeks = [];
    let weekdays = [];
    for (let day = from; day <= to; day = day.add(1, 'day')) {
        weekdays.push(day);
        if (day.day() === lastDayOfWeek) {
            weeks.push(weekdays);
            weekdays = [];
        }
    }

    return (
        <div class={'ExCalendar'}>
            <Switch>
                <Match when={error() !== undefined}>
                    {error()}
                </Match>
                <Match when={error() === undefined}>
                    <CalendarHeader />
                    <For each={weeks}>{(days) =>
                        <CalendarWeek days={days} {...props} />
                    }</For>
                </Match>
            </Switch>
        </div>
    )
}
