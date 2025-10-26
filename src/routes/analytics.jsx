import { ChartBarMultiple } from "@/components/Charts/ChartBarMultiple.tsx";
import { ChartLineDots } from "@/components/Charts/ChartLineDots.tsx";
import { ChartLineMoodTracker } from "@/components/Charts/ChartLineMoodTracker.tsx";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from '@/components/ui/calendar';
import { Calendar, CalendarCurrentDate, CalendarDayView, CalendarMonthView, CalendarNextTrigger, CalendarPrevTrigger, CalendarTodayTrigger, CalendarViewTrigger, CalendarWeekView, CalendarYearView } from "@/components/ui/full-calendar.tsx";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {getCalendarActivitySrv} from '../services/analytics.service.js'
import CalendarAnalyticsPage from "../components/CalendarAnalyticsPage.jsx";
const data = {
  streaks: [
    { date: "Jul 20", value: 1 },
    { date: "Jul 21", value: 2 },
    { date: "Jul 22", value: 3 },
    { date: "Jul 23", value: 0 },
    { date: "Jul 24", value: 2 },
    { date: "Jul 25", value: 4 },
  ],
  completions: [
    { date: "Jul 20", completed: 2, missed: 1 },
    { date: "Jul 21", completed: 4, missed: 0 },
    { date: "Jul 22", completed: 3, missed: 2 },
    { date: "Jul 23", completed: 0, missed: 4 },
    { date: "Jul 24", completed: 1, missed: 2 },
  ],
  moods: [
    { hour: "08:00", mood: 3 },
    { hour: "10:00", mood: 4 },
    { hour: "12:00", mood: 2 },
    { hour: "14:00", mood: 5 },
    { hour: "16:00", mood: 3 },
    { hour: "18:00", mood: 2 },
  ],
  rituals: [
    { date: "Jul 20", completed: true },
    { date: "Jul 21", completed: true },
    { date: "Jul 22", completed: false },
    { date: "Jul 23", completed: true },
  ],
};

export const Route = createFileRoute("/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  const [fetchUrges, setfetchUrges] = useState([]);
  const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({ title: "Analytics", subtitle: " Data Metrics and Performance Evaluation" });
  }, []);
  const [tab, setTab] = useState("streaks");
 const [events, setEvents] = useState([]);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await getCalendarActivitySrv();
      console.log("Fetched events:", res.data); // Verify the data here
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch calendar events:", err);
    }
  };
  fetchEvents();
}, []);

  const [fetchedData, setFetchedData] = useState(null);
 
  
  const fetchAnalytics = () => {
    axios
      .get("http://localhost:3000/api/analytics/summary")
      .then((res) => {
        console.log(res.data);
        setFetchedData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics:", err);
      });
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) return <div className="changed-px p-4">Loading...</div>;

  return (
    <ProtectedLayout>
        <Calendar
          events={[
    {
        id: "68fe4cfb707d5789c3950328",
        start: "2025-10-26T16:31:55.849Z",
        end: "2025-10-26T17:01:55.849Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe4cf7707d5789c3950321",
        start: "2025-10-26T16:31:51.860Z",
        end: "2025-10-26T17:01:51.860Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe4cf6707d5789c395031a",
        start: "2025-10-26T16:31:50.061Z",
        end: "2025-10-26T17:01:50.061Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe4ce4707d5789c39502fd",
        start: "2025-10-26T16:31:32.527Z",
        end: "2025-10-26T17:01:32.527Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fe4c97707d5789c39502c4",
        start: "2025-10-26T16:30:15.465Z",
        end: "2025-10-26T17:00:15.465Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe4c5f707d5789c39501ff",
        start: "2025-10-26T16:29:19.551Z",
        end: "2025-10-26T16:59:19.551Z",
        title: "Diary Entry",
        color: "green"
    },
    {
        id: "68fe4c53707d5789c39501f6",
        start: "2025-10-26T16:29:07.519Z",
        end: "2025-10-26T16:59:07.519Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fe4c52707d5789c39501ed",
        start: "2025-10-26T16:29:06.938Z",
        end: "2025-10-26T16:59:06.938Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fe4c52707d5789c39501e8",
        start: "2025-10-26T16:29:06.921Z",
        end: "2025-10-26T16:59:06.921Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fe43780d26009a029b42ca",
        start: "2025-10-26T15:51:20.294Z",
        end: "2025-10-26T16:21:20.294Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe42e10d26009a029b418d",
        start: "2025-10-26T15:48:49.633Z",
        end: "2025-10-26T16:18:49.633Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fe0dda1ad967d39daf56eb",
        start: "2025-10-26T12:02:34.757Z",
        end: "2025-10-26T12:32:34.757Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fe0dd91ad967d39daf56e1",
        start: "2025-10-26T12:02:33.994Z",
        end: "2025-10-26T12:32:33.994Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fe0dd91ad967d39daf56dd",
        start: "2025-10-26T12:02:33.985Z",
        end: "2025-10-26T12:32:33.985Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fdf8177d6b435129ff540e",
        start: "2025-10-26T10:29:43.850Z",
        end: "2025-10-26T10:59:43.850Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdf8147d6b435129ff5407",
        start: "2025-10-26T10:29:40.145Z",
        end: "2025-10-26T10:59:40.145Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdf8117d6b435129ff5400",
        start: "2025-10-26T10:29:37.198Z",
        end: "2025-10-26T10:59:37.198Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdc6111354b6c642493414",
        start: "2025-10-26T06:56:17.699Z",
        end: "2025-10-26T07:26:17.699Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdc6061354b6c64249340d",
        start: "2025-10-26T06:56:06.566Z",
        end: "2025-10-26T07:26:06.566Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fdc6061354b6c642493406",
        start: "2025-10-26T06:56:06.193Z",
        end: "2025-10-26T07:26:06.193Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fdc6051354b6c6424933fe",
        start: "2025-10-26T06:56:05.789Z",
        end: "2025-10-26T07:26:05.789Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fdc5f61354b6c6424933ec",
        start: "2025-10-26T06:55:50.460Z",
        end: "2025-10-26T07:25:50.460Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdc5e61354b6c6424933e5",
        start: "2025-10-26T06:55:34.291Z",
        end: "2025-10-26T07:25:34.291Z",
        title: "Violation Resolved",
        color: "blue"
    },
    {
        id: "68fdc5301354b6c6424933d0",
        start: "2025-10-26T06:52:32.345Z",
        end: "2025-10-26T07:22:32.345Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fdc0625f81ebe472034cd4",
        start: "2025-10-26T06:32:02.787Z",
        end: "2025-10-26T07:02:02.787Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbff90bf3e45622d00b6",
        start: "2025-10-26T06:13:19.501Z",
        end: "2025-10-26T06:43:19.501Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbfd90bf3e45622d00af",
        start: "2025-10-26T06:13:17.991Z",
        end: "2025-10-26T06:43:17.991Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbfb90bf3e45622d00a8",
        start: "2025-10-26T06:13:15.857Z",
        end: "2025-10-26T06:43:15.857Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbfa90bf3e45622d00a1",
        start: "2025-10-26T06:13:14.359Z",
        end: "2025-10-26T06:43:14.359Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbf890bf3e45622d009a",
        start: "2025-10-26T06:13:12.244Z",
        end: "2025-10-26T06:43:12.244Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbf590bf3e45622d0093",
        start: "2025-10-26T06:13:09.583Z",
        end: "2025-10-26T06:43:09.583Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbf290bf3e45622d008c",
        start: "2025-10-26T06:13:06.686Z",
        end: "2025-10-26T06:43:06.686Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbf090bf3e45622d0085",
        start: "2025-10-26T06:13:04.891Z",
        end: "2025-10-26T06:43:04.891Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdbbed90bf3e45622d007e",
        start: "2025-10-26T06:13:01.258Z",
        end: "2025-10-26T06:43:01.258Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdba66868e7c83b4b86096",
        start: "2025-10-26T06:06:30.682Z",
        end: "2025-10-26T06:36:30.682Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdba63868e7c83b4b8608f",
        start: "2025-10-26T06:06:27.257Z",
        end: "2025-10-26T06:36:27.257Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdba60868e7c83b4b86088",
        start: "2025-10-26T06:06:24.851Z",
        end: "2025-10-26T06:36:24.851Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdba5e868e7c83b4b86081",
        start: "2025-10-26T06:06:22.115Z",
        end: "2025-10-26T06:36:22.115Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fdb25673a53c0b558dad33",
        start: "2025-10-26T05:32:06.232Z",
        end: "2025-10-26T06:02:06.232Z",
        title: "Urge Logged",
        color: "blue"
    },
    {
        id: "68fdb23073a53c0b558dace8",
        start: "2025-10-26T05:31:28.747Z",
        end: "2025-10-26T06:01:28.747Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fd96b954cbca067403b34a",
        start: "2025-10-26T03:34:17.373Z",
        end: "2025-10-26T04:04:17.373Z",
        title: "Urge Logged",
        color: "blue"
    },
    {
        id: "68fd8aa3da5c138dc6527db2",
        start: "2025-10-26T02:42:43.804Z",
        end: "2025-10-26T03:12:43.804Z",
        title: "Urge Logged",
        color: "blue"
    },
    {
        id: "68fd88ccda5c138dc65277ad",
        start: "2025-10-26T02:34:52.788Z",
        end: "2025-10-26T03:04:52.788Z",
        title: "Violation Resolved",
        color: "blue"
    },
    {
        id: "68fd02f5597902f51e5e338f",
        start: "2025-10-25T17:03:49.719Z",
        end: "2025-10-25T17:33:49.719Z",
        title: "Diary Entry",
        color: "green"
    },
    {
        id: "68fe4bda707d5789c39500a6",
        start: "2025-10-25T16:27:06.567Z",
        end: "2025-10-25T16:57:06.567Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fceb0f521bcda7aab427a0",
        start: "2025-10-25T15:21:51.596Z",
        end: "2025-10-25T15:51:51.596Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce370521bcda7aab426ab",
        start: "2025-10-25T14:49:20.463Z",
        end: "2025-10-25T15:19:20.463Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fce36f521bcda7aab4269e",
        start: "2025-10-25T14:49:19.922Z",
        end: "2025-10-25T15:19:19.922Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fce36f521bcda7aab42690",
        start: "2025-10-25T14:49:19.156Z",
        end: "2025-10-25T15:19:19.156Z",
        title: "Timeblock Completed",
        color: "green"
    },
    {
        id: "68fce221521bcda7aab4263a",
        start: "2025-10-25T14:43:45.559Z",
        end: "2025-10-25T15:13:45.559Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce219521bcda7aab42614",
        start: "2025-10-25T14:43:37.607Z",
        end: "2025-10-25T15:13:37.607Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce1d7521bcda7aab424fc",
        start: "2025-10-25T14:42:31.084Z",
        end: "2025-10-25T15:12:31.084Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce113521bcda7aab421f9",
        start: "2025-10-25T14:39:15.487Z",
        end: "2025-10-25T15:09:15.487Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce111521bcda7aab421f2",
        start: "2025-10-25T14:39:13.016Z",
        end: "2025-10-25T15:09:13.016Z",
        title: "Ritual Created",
        color: "purple"
    },
    {
        id: "68fce0f2521bcda7aab42196",
        start: "2025-10-25T14:38:42.347Z",
        end: "2025-10-25T15:08:42.347Z",
        title: "Timer Reset Penalty",
        color: "pink"
    },
    {
        id: "68fcdc20d8e7b6e1e4b51717",
        start: "2025-10-25T14:18:08.505Z",
        end: "2025-10-25T14:48:08.505Z",
        title: "Urge Logged",
        color: "blue"
    },
    {
        id: "68fcdc13d8e7b6e1e4b51702",
        start: "2025-10-25T14:17:55.076Z",
        end: "2025-10-25T14:47:55.076Z",
        title: "Diary Entry",
        color: "green"
    }
]}>
          <div className="h-dvh py-6 flex flex-col">
            <div className="flex px-6 items-center gap-2 mb-6">
              <CalendarViewTrigger className="aria-[current=true]:bg-accent" view="day">
                Day
              </CalendarViewTrigger>
              <CalendarViewTrigger view="week" className="aria-[current=true]:bg-accent">
                Week
              </CalendarViewTrigger>
              <CalendarViewTrigger view="month" className="aria-[current=true]:bg-accent">
                Month
              </CalendarViewTrigger>
              <CalendarViewTrigger view="year" className="aria-[current=true]:bg-accent">
                Year
              </CalendarViewTrigger>

              <span className="flex-1" />

              <CalendarCurrentDate />

              <CalendarPrevTrigger>
                <ChevronLeft size={20} />
                <span className="sr-only">Previous</span>
              </CalendarPrevTrigger>

              <CalendarTodayTrigger>Today</CalendarTodayTrigger>

              <CalendarNextTrigger>
                <ChevronRight size={20} />
                <span className="sr-only">Next</span>
              </CalendarNextTrigger>

              {/* <ModeToggle /> */}
            </div>

            <div className="flex-1 overflow-auto px-6 relative">
              <CalendarDayView />
              <CalendarWeekView />
              <CalendarMonthView />
              <CalendarYearView />
            </div>
          </div>
        </Calendar>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
            <div className="grid grid-cols-1 items-start gap-4  md:grid-cols-2 lg:changed-px px-4">
              <ChartLineDots />
              <ChartBarMultiple />
              <ChartLineMoodTracker />
              <Card>
                <CardHeader>
                  <CardTitle>Ritual Check-In History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {data.rituals.map((r, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{r.date}</span>
                        <span className={r.completed ? "text-green-600" : "text-red-500"}>{r.completed ? "✔ Done" : "✘ Missed"}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
