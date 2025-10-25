
// TODO remove the reoslved violatrions form db and render on fe
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconArchive, IconFlagQuestion, IconRotate2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSound } from "react-sounds";
import { toast } from "sonner";

import { EVENT_POINTS } from "../utils/point.utils";
import { applyPointsSrv } from "../services/points.service";
import { getTodayViolationsSrv, getViolations, resolveViolationSrv } from "../services/violation.service";
import { setPt } from "../store/pointsSlice";

dayjs.extend(relativeTime);

export function RecentViolations({ totalCount, violations , setViolations}) {
  const [localViolations, setLocalViolations] = useState(violations || []);
  const navigate=useNavigate()
  const getViolationDemand =()=>{
      getTodayViolationsSrv().then((res) => setLocalViolations(res.data || violations || []));
  
  }
  const dispatch = useDispatch();
  const { play } = useSound("ui/success_bling");
  useEffect(() => {
    setLocalViolations(violations || []);
  }, [violations]);
  if (localViolations?.length == 0)
    return (
      <Card>
        <CardHeader>
          {/* <CardTitle>Violations Logs</CardTitle> */}
          <CardDescription className="flex flex-col gap-3 justify-center items-center" >
            <p>No violations yet. Stay disciplined!</p>
                                  <Button onClick={getViolationDemand} variant="outline" className="">
                        {" "}
                        <IconRotate2 /> Check for Violations
                      </Button>

</CardDescription>
        
        </CardHeader>
      </Card>
    );

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="mb-2 flex flex-col gap-0 border-b pb-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Hall of Shame <span className="rounded-full bg-red-500/30 px-2 py-1 text-xs font-bold text-red-400">{totalCount}</span>
          </h2>
          <span className="text-secondary-foreground/60 text-xs"> Recent Violations</span>
        </div>

        <Link className=" " to="/violations">
          {" "}
          <Button variant="outline">
            <IconArchive size={14} className="mb-px" />
            Violation Archive
          </Button>
        </Link>
      </div>
      <Table>
       
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {/* <TableHead>Time</TableHead> */}
            <TableHead>Task</TableHead>
 
            <TableHead>Resolution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localViolations.map((v) => (
            <TableRow key={v._id}>
              <TableCell>{dayjs(v.timestamp).fromNow()}</TableCell>
           

              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconFlagQuestion className="-mt-0.5 mr-1.5 inline size-4 text-red-800 opacity-60 dark:text-red-500" />
                       </TooltipTrigger>
                    <TooltipContent>
                      <p>Violation Type: {v.type.replace("_", " ")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {(v.blockData?.task).length > 14 ? `${(v.blockData?.task).slice(0, 14)}...` : v.blockData?.task}
              </TableCell>
              
              <TableCell>
                <Button
                  onClick={async () => {
                    resolveViolationSrv(v._id);
                    play();
                    const updatedPoints = await applyPointsSrv("VIOLATION_RESOLVED_CREDIT");
                    toast(`Points credited: ${EVENT_POINTS.VIOLATION_RESOLVED_CREDIT}. Great work`, {
                       position: "top-center",
                      description: `Updated Balance: ${updatedPoints.data.points}`,
                      action: {
                        label: "Back to work",
                        onClick: () => navigate({to:"/"}),
                      },
                    });
                    // console.log(v._id, v.uid);

                    dispatch(setPt(updatedPoints.data.points));
                    setViolations((prev) => prev.filter((item) => item._id !== v._id));
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-primary">
                  Resolve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ViolationsLogsFull() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { play } = useSound("ui/success_bling");

  const [violations, setViolations] = useState([]);
  const [todayViolations, setTodayViolations] = useState([]);

  useEffect(() => {
    async function fetchViolations() {
      const res = await getViolations();
      setViolations(res.data);

      // filter today's
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const todaysOnly = res.data.filter((v) => {
        const vDate = new Date(v.timestamp).toISOString().slice(0, 10);
        return vDate === today;
      });
      setTodayViolations(todaysOnly);
    }

    fetchViolations();
    // console.log(todayViolations);
  }, []);

  if (!todayViolations?.length) return <p className="text-muted-foreground">No violations yet. Stay disciplined!</p>;

  return (
    <div className="rounded-lg border mx-4 p-4">
      <div className="flex items-center justify-between">
        <div className="mb-2 flex flex-col gap-0   pb-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Hall of Shame <span className="rounded-full bg-red-500/30 px-2 py-1 text-xs font-bold text-red-400">{violations.length}</span>
          </h2>
          <span className="text-secondary-foreground/60 text-xs"> Violation History</span>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Task</TableHead>

            <TableHead>Type</TableHead>

            <TableHead className="pl-4">
              {/* // TODO: violation Resolution   */}
              Resolution
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {violations.map((v, idx) => (
            <TableRow key={v._id}>
              <TableCell>{idx + 1}.</TableCell>

              <TableCell>{dayjs(v.timestamp).format("DD MMMM, YYYY")}</TableCell>

              <TableCell>
                {v.blockData?.startTime} - {v.blockData?.endTime}
              </TableCell>

              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconFlagQuestion className="-mt-0.5 mr-1.5 inline size-4 text-red-800 opacity-60 dark:text-red-500" />
                      {/* <CircleQuestionMarkIcon className=" text-red-800 dark:text-red-500 mr-1 inline size-4 opacity-60" /> */}
                      {/* <Info className="text-primary mr-1 inline size-4 opacity-60" /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{v.tauntStatement}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {(v.blockData?.task).length > 14 ? `${(v.blockData?.task).slice(0, 14)}...` : v.blockData?.task}
              </TableCell>
              <TableCell>
                {" "}
                <span>
                  {/* <span className="rounded-sm bg-red-600/20 px-0.75 py-1 text-red-400"> */}
                  {v.type.replace("_", " ")}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  onClick={async () => {
                    resolveViolationSrv(v._id);
                    play();
                    const updatedPoints = await applyPointsSrv("VIOLATION_RESOLVED_CREDIT");
                    toast(`Points credited: ${EVENT_POINTS.VIOLATION_RESOLVED_CREDIT}. Great work`, {
                       position: "top-center",
                      description: `Updated Balance: ${updatedPoints.data.points}`,
                      action: {
                        label: "Back to work",
                        onClick: () => navigate({to:"/"}),
                      },
                    });
                    // console.log(v._id, v.uid);

                    dispatch(setPt(updatedPoints.data.points));
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-primary">
                  Resolve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
