import { ChartBarInteractive } from "@/components/chart-bar-interactive.tsx";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
 
import { ChartLineDots } from '@/components/Charts/ChartLineDots.tsx';
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

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="completions">Completed vs Missed</TabsTrigger>
          <TabsTrigger value="moods">Mood Tracker</TabsTrigger>
          <TabsTrigger value="rituals">Ritual History</TabsTrigger>
        </TabsList>

        <TabsContent value="streaks">
          <Card>
            <CardHeader>
              <CardTitle>Streaks Over Days</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.streaks}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completions">
          <Card>
            <CardHeader>
              <CardTitle>Completed vs Missed Blocks</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.completions}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                  <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moods">
          <Card>
            <CardHeader>
              <CardTitle>Mood Over the Day</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.moods}>
                  <XAxis dataKey="hour" />
                  <YAxis domain={[1, 5]} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rituals">
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
        </TabsContent>
      </Tabs>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
          
            <div className="grid grid-cols-1 items-start gap-4  md:grid-cols-2 lg:changed-px px-4">
 <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"/>
               <ChartLineDots  />
               <ChartLineDots  />
               <ChartLineDots  />
              <ChartBarInteractive title="Mood Tracker" urges={fetchUrges} />
              <ChartBarInteractive title="Ritual History" urges={fetchUrges} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
