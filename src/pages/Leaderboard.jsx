import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IconAccessPoint, IconBolt, IconLiveView, IconTrendingDown, IconTrendingUp, IconWifi, IconWifi0 } from "@tabler/icons-react";
import { IconBoltFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DotIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { leaderboardUsersSrv } from "../services/analytics.service.js";
import { getPointsLedgerSrv, getUserSrv } from "../services/user.service.js";
import { usePageMeta } from "@/contexts/PageMetaContext";

const Leaderboard = () => {
  const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Leaderboard',
subtitle:'Performance ranking, comparisons and global points ledger'
});
  }, []);
  const [violations, setViolations] = useState([]);
async function getUserFullNameFn(userId) {
  const getUser=  await getUserSrv(userId)
             return getUser.data.name
  
}
  const [pointsLedgerFe, setPointsLedgerFe] = useState([]);
  async function getPpointsFn() {
    const resLedger = await getPointsLedgerSrv();
    setPointsLedgerFe(resLedger?.data?.entries);
    // console.log(resLedger?.data?.entries);
  }
  useEffect(() => {
    getPpointsFn();
  }, []);

  useEffect(() => {
    leaderboardUsersSrv().then((res) => setViolations(res.data));
  }, []);

  return (
    <section className="grid grid-cols-1 items-start gap-2 md:gap-4  md:grid-cols-3 lg:changed-px px-4">
      <div className="rounded-lg col-span-2 border  p-4">
        <div className="flex items-center justify-between">
          <div className="mb-2 flex flex-col gap-0   pb-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              Hall of Fame
              <Badge>
                <IconBoltFilled />
                Top {violations.length}{" "}
              </Badge>
            </h2>
            <span className="text-secondary-foreground/60 text-xs"> Leaderboard</span>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead> Credits</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((v, idx) => {
              let topUserIcon;
              let shiftPosition;
              switch (idx) {
                case 0: // Gold
                  // shiftPosition="relative right-9"

                  topUserIcon = (
                    <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-yellow-400/20 text-yellow-500">
                      <IconBolt size={14} stroke={2.5} />
                    </span>
                  );
                  break;
                case 1: // Silver
                  // shiftPosition="relative right-9"
                  topUserIcon = (
                    <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-gray-400/20 text-gray-400">
                      <IconBolt size={14} stroke={2.5} />
                    </span>
                  );
                  break;
                case 2: // Bronze
                  // shiftPosition="relative right-9"
                  topUserIcon = (
                    <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-amber-700/20 text-amber-700">
                      <IconBolt size={14} stroke={2.5} />
                    </span>
                  );
                  break;
                default:
                  topUserIcon = null;
                  break;
              }

              return (
                <TableRow key={v._id}>
                  <TableCell>{idx + 1}.</TableCell>

                  <TableCell className="flex items-center justify-start gap-2">
                    <Avatar>
                      <AvatarImage src={v.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {v.name}
                  </TableCell>
                  <TableCell className={shiftPosition}>
                    {v.points}
                    {topUserIcon}
                  </TableCell>
                  <TableCell>{dayjs(v.createdAt).format("DD MMM, YYYY")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <ScrollArea className="h-screen p-4 border rounded-md ">
                  <div className="mb-2 flex flex-col gap-0   pb-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
             Points activity
              <Badge variant="secondary" >
                <IconAccessPoint />
                Live 
              </Badge>
            </h2>
            <span className="text-secondary-foreground/60 text-xs"> Coming Soon</span>
          </div>

        <ol className="  ">
          {pointsLedgerFe
            ? pointsLedgerFe.map(  (entry, idx) =>{
             const txnUserName= getUserFullNameFn(entry.uid)
              return (
                <li key={idx} className="border-b py-2  flex items-center justify-between  ">
                  <div>
                    <div className="flex gap-4 items-center  justify-start">
                      {/* <span className="opacity-30">#{idx + 1}</span> */}
                      <div>
                        <Badge variant="outline" className="border-0 px-0 ">
                          {/* {txnUserName} */}
                          {entry.type.includes("credit".toUpperCase()) ? <IconTrendingUp className="text-green-400 mr-1" /> : <IconTrendingDown className="text-red-400" />}
                         {entry.user} {entry.type.includes("credit")}
                          {entry.type.includes("credit".toUpperCase()) ? "credited" : "debited"} with <span className={cn("  text-sm font-normal leading-none ", entry.points > 0 ? "  text-green-400" : "text-red-400")}>{Math.abs(entry.points)}</span> pts
                        </Badge>{" "} 
                        <p className="text-xs   text-secondary-foreground/40">
                          {entry.type.replace(/_/g, " ")}
                       <DotIcon className="inline -mx-1    md:hidden " />   Balance{" "} 
                          <span className="text-secondary-foreground/40 font-medium">
                            {entry?.points} → {entry?.balanceAfter}
                          </span>
                        </p>
                      </div>{" "}
                    </div>{" "}
                  </div>
                  {/* <div className="flex flex-col items-end text-xs text-secondary-foreground/40">
                    <span>{dayjs(entry.createdAt).format("DD MMM")}</span>
                    <span>{dayjs(entry.createdAt).format("hh:mm a")}</span>
                  </div> */}
                </li>
              )})
            : null}
        </ol>
      </ScrollArea>
    </section>
  );
};

export default Leaderboard;
