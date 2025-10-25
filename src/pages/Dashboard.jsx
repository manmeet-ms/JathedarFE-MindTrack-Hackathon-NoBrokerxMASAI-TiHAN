import RitualInputForm from "@/components/Forms/RitualInputForm";
import { StatsGrid } from "@/components/StatsGrid";
import TimeBlockCard from "@/components/TimeBlockCard";
import { RecentViolations } from "@/components/ViolationLogs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { useLocation } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";

import { getTodayRitual } from "../services/ritual.service";
import { getViolations } from "../services/violation.service";

const Dashboard = () => {
  const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({ title: "Dashboard", subtitle: " Your mirror, centralized Monitoring" });
  }, []);

 
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      // Clean up URL so token isn't exposed in address bar
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [location]);

  const [blocks, setBlocks] = useState([]);
  const [ritual, setRitual] = useState([]);

  const [stats, setStats] = useState(null);
  const [violations, setViolations] = useState([]);

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios.get(`${baseURL}/analytics/summary`).then((res) => setStats(res.data));
    // axios.get(`${baseURL}/violations`).then((res) => setViolations(res.data));
  }, [baseURL]);

  useEffect(() => {
    //   getTodayBlocks().then((res) => setBlocks(res.data)); // in timeblock card already
    // getting all rituals in collections
    getTodayRitual().then((res) => setRitual(res.data));
    // getViolations().then((res) => setViolations(res.data));
    getViolations().then((res) => setViolations(res.data));
  }, []);

 
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
            <StatsGrid statsDataProp={stats} />
            <div className="grid grid-cols-1 items-start gap-4  md:grid-cols-2 lg:changed-px px-4">
              {/* <ChartAreaInteractive /> */}
              {/* <Button
                onClick={async () => {
                  const newPoints = await applyPointsSrv("TIMEBLOCK_COMPLETE_CREDIT");
                  console.log(newPoints);

                  dispatch(setPt(newPoints.data.points));
                }}>
                Add +20 points
              </Button>
              <Button
                onClick={async () => {
                  const newPoints = await applyPointsSrv("TIMER_RESET_PENALTY");
                  dispatch(setPt(newPoints.data.points));
                }}>
                Deduct -60 points
              </Button> */}
              {/* { !user?.id&& 
<Link target='_blank' to="http://localhost:3000/api/auth/discord/login"><Button>Login with Discord</Button></Link>
} */}
              <TimeBlockCard />
              <div className="">
                {blocks.some((b) => !b.completed && b.strict) && (
                  <Card className="mb-4 bg-red-800/20">
                    <CardContent className="">
                      <h2 className="mb-2 text-xl font-bold">Strict Mode Active</h2>
                      <p>Uncompleted strict tasks will trigger punishments.</p>
                    </CardContent>
                  </Card>
                )}
                <RecentViolations violations={violations.slice(0, 5)} totalCount={violations.length} setViolations={setViolations} />

                {/* {ritual.length<0?    <section className="bg-card my-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    {" "}
                    <h2 className="text-xl font-bold">
                      Today’s Ritual
                      <span className="bg-primary/20 text-primary ml-2 rounded-full px-2 py-1.25 text-xs font-bold">{ritual.length}</span>
                    </h2>
                    <RitualInputForm />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>

                        <TableHead>Vows</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ritual.map((r, idx) => (
                        <TableRow key={r._id}>
                          <TableCell className="w-1/4">{r.date}</TableCell>
                          <TableCell className="">{r.vow}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </section>:null} */}
                <section className="bg-card my-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    {" "}
                    <h2 className="text-xl font-bold">
                      Today’s Ritual
                      <span className="bg-primary/20 text-primary ml-2 rounded-full px-2 py-1.25 text-xs font-bold">{ritual.length}</span>
                    </h2>
                    <RitualInputForm />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>

                        <TableHead>Vows</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ritual.map((r) => (
                        <TableRow key={r._id}>
                          <TableCell className="w-1/4">{r.date}</TableCell>
                          <TableCell className="">{r.vow}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </section>

                {/* <PhilosophyQuoteCard /> */}

                {/* <NegativesDiscordCards/> */}
                 
                  <Card>
                    <CardHeader>
                      <CardTitle>Diary Outputs</CardTitle>
                      <CardDescription>Negative Consequences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
