import { ChartBarInteractive } from "@/components/chart-bar-interactive.tsx";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
 
import { ChartBarMultiple } from '@/components/Charts/ChartBarMultiple.tsx';
import { ChartLineDots } from '@/components/Charts/ChartLineDots.tsx';
import { ChartLineMoodTracker } from '@/components/Charts/ChartLineMoodTracker.tsx';
import { Calendar } from '@/components/ui/calendar';
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
const [date, setDate] =  useState(new Date())

  if (!data) return <div className="changed-px p-4">Loading...</div>;
 
  return (
    <ProtectedLayout>
 
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
          
            <div className="grid grid-cols-1 items-start gap-4  md:grid-cols-2 lg:changed-px px-4">
 <div>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]'
      />
      <p className='text-muted-foreground mt-3 text-center text-xs' role='region'>
        Streak Calendar 
      </p>
    </div>
                   <ChartLineDots  />
                   <ChartBarMultiple  />
                   <ChartLineMoodTracker  />
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
