import { useEffect, useState } from "react";
import { Calendar, CalendarCurrentDate, CalendarDayView, CalendarMonthView, CalendarNextTrigger, CalendarPrevTrigger, CalendarTodayTrigger, CalendarViewTrigger, CalendarWeekView, CalendarYearView } from "@/components/ui/full-calendar.tsx";
import { getCalendarActivitySrv } from "../services/analytics.service";

export default function CalendarAnalyticsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getCalendarActivitySrv();
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <Calendar events={events}>
      <div className="h-dvh py-6 flex flex-col">
        <div className="flex px-6 items-center gap-2 mb-6">
          <CalendarViewTrigger view="day">Day</CalendarViewTrigger>
          <CalendarViewTrigger view="week">Week</CalendarViewTrigger>
          <CalendarViewTrigger view="month">Month</CalendarViewTrigger>
          <CalendarViewTrigger view="year">Year</CalendarViewTrigger>
          <span className="flex-1" />
          <CalendarCurrentDate />
          <CalendarPrevTrigger>Prev</CalendarPrevTrigger>
          <CalendarTodayTrigger>Today</CalendarTodayTrigger>
          <CalendarNextTrigger>Next</CalendarNextTrigger>
        </div>

        <div className="flex-1 overflow-auto px-6 relative">
          <CalendarDayView />
          <CalendarWeekView />
          <CalendarMonthView />
          <CalendarYearView />
        </div>
      </div>
    </Calendar>
  );
}
