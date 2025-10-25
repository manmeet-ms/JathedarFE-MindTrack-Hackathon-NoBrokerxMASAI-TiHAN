"use client";
import { createFileRoute } from '@tanstack/react-router'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// TODO:   add ind timeone
// TODO: failures nmotification here as well , in public discord and violations and hall of shame and histry, urges, notificaiton public discord server messag e

// TODO:   send notifiaction
// TODO: ask for agreemnt when resetting

import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePageMeta } from "@/contexts/PageMetaContext";
import dayjs from "dayjs";
// ES 2015
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime";
import { Activity, ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon, Award, BatteryCharging, BatteryMedium, Brain, BrainCircuit, CrownIcon, Dot, GitMerge, Siren } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { useSound } from "react-sounds";
import { toast } from "sonner";

import { QUOTES } from "../../shared/constants.js";

import { applyPointsSrv } from "../services/points.service.js";
import { setPt } from "../store/pointsSlice.js";
import { EVENT_POINTS } from "../utils/point.utils.js";
import { screenShake } from "../utils/screen-shake.utils.js";
import Agreement from "../pages/Agreement.jsx";
import { getChronosSrv, resetChronosSrv } from "../services/chronos.service.js";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const Route = createFileRoute('/chronos')({
  component: RouteComponent,
})

function RouteComponent() {
    const { setPageMeta } = usePageMeta();
  
    useEffect(() => {
      setPageMeta({ title: "Chronos", subtitle: "Self tracking" });
    }, []);
    let rankDistribution = [
      {
        hours: 24 * 30,
        name: "Unlocking the righteous self",
        icon: <CrownIcon className={`-mt-1 mr-2 inline w-3 items-center text-rose-500`} strokeWidth={2.5} />,
        bgColor: "bg-pink-500 dark:bg-pink-600",
        bgColorWithOpacity: "border border-pink-800/20 dark:border-pink-400/40  bg-pink-400/10 border-dotted dark:border-solid dark:bg-pink-700/20",
        textColor: "text-pink-800 dark:text-pink-400",
      },
      {
        hours: 24 * 21,
        name: "Neurological transformation",
        icon: <GitMerge className={`-mt-1 mr-2 inline w-3 items-center text-purple-500`} strokeWidth={2.5} />,
        bgColor: "bg-purple-500 dark:bg-purple-600",
        bgColorWithOpacity: "border border-purple-800/20 dark:border-purple-400/40  bg-purple-400/10 border-dotted dark:border-solid dark:bg-purple-700/20",
        textColor: "text-purple-800 dark:text-purple-400",
      },
      {
        hours: 24 * 10,
        name: "Deep habit reformation",
        icon: <BrainCircuit className={`-mt-1 mr-2 inline w-3 items-center text-indigo-500`} strokeWidth={2.5} />,
        bgColor: "bg-indigo-500 dark:bg-indigo-600",
        bgColorWithOpacity: "border border-indigo-800/20 dark:border-indigo-400/40  bg-indigo-400/10 border-dotted dark:border-solid dark:bg-indigo-700/20",
        textColor: "text-indigo-800 dark:text-indigo-400",
      },
      {
        hours: 24 * 7,
        name: "Neural Recalibration",
        icon: <Brain className={`-mt-1 mr-2 inline w-3 items-center text-sky-500`} strokeWidth={2.25} />,
        bgColor: "bg-sky-500 dark:bg-sky-600",
        bgColorWithOpacity: "border border-sky-800/20 dark:border-sky-400/40  bg-sky-400/10 border-dotted dark:border-solid dark:bg-sky-700/20",
        textColor: "text-sky-800 dark:text-sky-400",
      },
      {
        hours: 24 * 5,
        name: "Establishing new patterns",
        icon: <Activity className={`-mt-1 mr-2 inline w-3 items-center text-teal-500`} strokeWidth={2.5} />,
        bgColor: "bg-teal-500 dark:bg-teal-600",
        bgColorWithOpacity: "border border-teal-800/20 dark:border-teal-400/40  bg-teal-400/10 border-dotted dark:border-solid dark:bg-teal-700/20",
        textColor: "text-teal-800 dark:text-teal-400",
      },
      {
        hours: 24 * 3,
        name: "Breaking through barriers",
        icon: <Award className={`-mt-1 mr-2 inline w-3 items-center text-green-500`} strokeWidth={2.25} />,
        bgColor: "bg-green-500 dark:bg-green-600",
        bgColorWithOpacity: "border border-green-800/20 dark:border-green-400/40  bg-green-400/10 border-dotted dark:border-solid dark:bg-green-700/20",
        textColor: "text-green-800 dark:text-green-400",
      },
      {
        hours: 24 * 2,
        name: "Short-Term Achieved",
        icon: <BatteryCharging className={`-mt-1 mr-2 inline w-3 items-center text-amber-500`} strokeWidth={2.5} />,
        bgColor: "bg-amber-500 dark:bg-amber-600",
        bgColorWithOpacity: "border border-amber-800/20 dark:border-amber-400/40  bg-amber-400/10 border-dotted dark:border-solid dark:bg-amber-700/20",
        textColor: "text-amber-800 dark:text-amber-400",
      },
      {
        hours: 24 * 1,
        name: "Full day commitment",
        icon: <BatteryMedium className={`-mt-1 mr-2 inline w-3 items-center text-yellow-500`} strokeWidth={2.5} />,
        bgColor: "bg-yellow-500 dark:bg-yellow-600",
        bgColorWithOpacity: "border border-yellow-800/20 dark:border-yellow-400/40  bg-yellow-400/10 border-dotted dark:border-solid dark:bg-yellow-700/20",
        textColor: "text-yellow-800 dark:text-yellow-400",
      },
      {
        hours: 10,
        name: "Reboot",
        icon: <Siren className={`-mt-1 mr-2 inline w-3 items-center text-slate-500`} strokeWidth={2.25} />,
        bgColor: "bg-slate-500 dark:bg-slate-600",
        bgColorWithOpacity: "border border-slate-800/20 dark:border-slate-400/40  bg-slate-400/10 border-dotted dark:border-solid dark:bg-slate-700/20",
        textColor: "text-slate-800 dark:text-slate-400",
      },
      {
        hours: 0,
        // "Detention !" || 
        name: "Negative Reinforcement",
        icon: <Siren className={`text-brown-500 -mt-1 mr-2 inline w-3 items-center`} strokeWidth={2.25} />,
        bgColor: "bg-red-500 dark:bg-red-600",
        bgColorWithOpacity: "border border-red-800/20 dark:border-red-400/40  bg-red-400/10 border-dotted dark:border-solid dark:bg-red-700/10",
        textColor: "text-red-800 dark:text-red-400",
      },
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { play } = useSound("notification/error");
  
    const [timers, setTimers] = useState([]);
    const fetchTimers = async () => {
      const res = await getChronosSrv();
      console.log("Timers response:", res.data);
      setTimers(res.data);
  
      // setTimers(res);
    };
    useEffect(() => {
      fetchTimers();
      // console.log("under useeffect ");
    }, []);
  
  return (
    <>
          <main className=" grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 space-y-4 px-4">
            <section className="col-span-2 flex flex-col gap-4">
              {timers.length !== 0
                ? timers.map((item, idx) => {
                    const randomIndex = Math.floor(Math.random() * QUOTES.length);
                    const randomQuote = QUOTES[randomIndex];
    
                    const startDate = dayjs(item.timerStarted); // when the timer started
                    const now = dayjs(); // current time
    
                    const diffDuration = dayjs.duration(now.diff(startDate));
    
                    const hours = String(Math.floor(diffDuration.asHours())).padStart(2, "0"); // total hours
                    const minutes = String(Math.floor(diffDuration.asMinutes() % 60)).padStart(2, "0"); // leftover minutes
                    const seconds = String(Math.floor(diffDuration.asSeconds() % 60)).padStart(2, "0"); // leftover seconds
                    // console.log("startDate", startDate);
                    // console.log("now", now);
    
                    // console.log("⏳ Time Difference:", {
                    //   hours,
                    //   minutes,
                    //   seconds,
                    // });
                    let rankIdx, rankObject;
    
                    if (hours >= 24 * 30) {
                      rankIdx = 0;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 24 * 21) {
                      rankIdx = 1;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 24 * 10) {
                      rankIdx = 2;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 24 * 7) {
                      rankIdx = 3;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 24 * 5) {
                      rankIdx = 4;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 72) {
                      rankIdx = 5;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 48) {
                      rankIdx = 6;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 24) {
                      rankIdx = 7;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours >= 10) {
                      rankIdx = 8;
                      rankObject = { ...rankDistribution[rankIdx] };
                      // upNextRank = { ...rankDistribution[rankIdx - 1] };
    
                      // console.log(rankIdx, rankObject);
                    } else if (hours < 10) {
                      rankIdx = -1;
                      rankObject = { ...rankDistribution[rankDistribution.length - 1] };
                    } else {
                      rankIdx = -1;
                      rankObject = { ...rankDistribution[rankDistribution.length - 1] };
                    }
    
                    // const minutes = diffDuration.minutes().toString().padStart(2, "0");
                    // const seconds = diffDuration.seconds().toString().padStart(2, "0");
                    // // const timeDiff = `${hours}h:${minutes}m:${seconds}s`;
                    const timeDiff = `${hours}:${minutes}:${seconds}`;
                    const handleResetTimer = async () => {
                      screenShake();
                      console.log("handleResetTimer clicked", item._id);
                      const timerId = String(item._id);
                      await resetChronosSrv(timerId);
                      const updatedPoints = await applyPointsSrv("TIMER_RESET_PENALTY");
                      console.log(updatedPoints);
                      // TODO play sound on toast default?
                      play();
                      toast(`Points deducted: ${EVENT_POINTS.TIMER_RESET_PENALTY}`, {
                        position: "top-center",
                        description: `Such a shame. Updated Balance: ${updatedPoints.data.points}`,
                        action: {
                          label: "Back to work",
                          onClick: () => navigate("/"),
                        },
                      });
                      dispatch(setPt(updatedPoints.data.points));
    
                      await fetchTimers();
                    };
                    return (
                      <section key={idx}>
                        <div className={`bg-card/80 rounded-xl border px-4 py-6`}>
                          <div className="flex h-full items-center justify-between">
                            <div className=" ">
                              {/* <div className="mr-2 item-center inline-flex justify-center">
                              <div className={`absolute z-2 h-2 w-2 rounded-full ${item.pulseTheme}`}></div>
                              <div className={`h-2 w-2 animate-ping rounded-full ${item.pulseTheme}`}></div>
                            </div> */}
                              <h2 className={`title-font text-primary  inline-flex items-center text-xs capitalize`}>
                                {item.codename}
    
                                <span className={`ml-2 inline-flex cursor-pointer items-center font-medium ${rankObject.textColor} ${rankObject.bgColorWithOpacity} rounded px-1.5 py-0.5`}>
                                  {/* className={`ml-2 inline-flex cursor-pointer items-center font-medium ${rankObject.textColor} ${rankObject.bgColorWithOpacity} rounded px-1.5 py-0.5`}> */}
                                  {/* {rankObject.icon}#{rankIdx} - {rankObject.name} */}
                                  Rank #{rankIdx}
                                  <Dot
                                    // className="text-slate-900 dark:text-foreground/60 "
                                    size={14}
                                    strokeWidth={2}
                                  />{" "}
                                  {rankObject.name}
                                </span>
                              </h2>
                              <h1 className="title-font text-foreground text-xl font-medium">{item.title}</h1>
                              <p className="w-56 truncate text-muted-foreground text-sm">{item.quoteFlashingAllowed ? randomQuote : item.description}</p>
    
                              {/* <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full border px-3 py-2"
                          >
                            <Pencil
                              className="mr-1 inline-flex items-center"
                              size={14}
                              strokeWidth={2.25}
                            />
                            Edit
                            <span className="text-foreground/20 font-light"
                            >|</span>
                            <Undo2 strokeWidth={2.25} size={14} />
                            Reset
                            <span className="text-foreground/20 font-light"
                            >|</span>
                            <XIcon strokeWidth={2.25} size={14} />
                            Delete
                          </div> */}
                            </div>
                            <div className="items-en flex flex-col justify-center">
                              {/* timer controls */}
    
                              {/* <div className="flex cursor-pointer items-center justify-center gap-4  
                        "
                        >
                    <Pencil
                      className="mr-1 inline-flex items-center"
                      size={14}
                      strokeWidth={2.25}
                    />
                    <Undo2 strokeWidth={2.25} size={14} />
                    <XIcon strokeWidth={2.25} size={14} /> 
                  </div> */}
    
                              <h2 className="text-foreground text-center text-xl font-medium">{timeDiff}</h2>
                              <span className="text-foreground/40 mb-1 text-xs font-light">{dayjs(startDate).from(dayjs())}</span>
                            </div>
                          </div>
                          <section className="flex flex-wrap gap-0.75 py-2 text-sm">
                            {" "}
                            {item.perks.map((pill, idx) => (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger className="rounded bg-blue-400/40 p-1 px-2 font-semibold text-blue-800 capitalize dark:bg-blue-800/20 dark:text-blue-400">
                                    {/* <TooltipTrigger className="rounded border border-dashed border-blue-400/60 bg-blue-400/40 p-1 px-2 font-semibold text-blue-800 capitalize dark:bg-blue-800/20 dark:text-blue-400"> */}
                                    <span>
                                      {pill.name}
                                      <ArrowUpIcon strokeWidth={2.5} className="relative bottom-0.5 mt-0.5 ml-1 inline-flex items-center justify-center" size={12} />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent  className='max-w-64 text-center'>
                                    <p >{pill.description || null}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                            {/* <hr className="my-2"/> */}
                            {item.alternates.map((pill, idx) => (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger className="rounded bg-green-500/40 p-1 px-2 font-semibold text-green-900 capitalize dark:bg-green-800/20 dark:text-green-400">
                                    {/* <TooltipTrigger className="rounded border border-dashed border-green-400/60 bg-green-500/40 p-1 px-2 font-semibold text-green-900 capitalize dark:bg-green-800/20 dark:text-green-400"> */}
                                    <span>
                                      {pill.name}
                                      <ArrowUpRightIcon strokeWidth={2.5} className="relative bottom-0.5 mt-0.5 ml-1 inline-flex items-center justify-center" size={12} />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent  className='max-w-64 text-center'>
                                    <p >{pill.description || null}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                            {item.punishments.map((pill, idx) => (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger className="rounded bg-red-400/40 p-1 px-2 font-semibold text-red-800 capitalize dark:bg-red-800/20 dark:text-red-400">
                                    {/* <TooltipTrigger className="rounded border border-dashed border-red-400/60 bg-red-400/40 p-1 px-2 font-semibold text-red-800 capitalize dark:bg-red-800/20 dark:text-red-400"> */}
                                    <span>
                                      {pill.name}
                                      {pill.icon ? pill.icon : <ArrowDownIcon strokeWidth={2.5} className="relative bottom-0.5 mt-0.5 ml-1 inline-flex items-center justify-center" size={12} />}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent  className='max-w-64 text-center'>
                                    <p >{pill.description || null}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}{" "}
                          </section>
    
                          <div className="mt-4 flex items-center gap-2 text-xs">
                            {" "}
                            {/* {dayjs(item.
                          4} strokeWidth={2} className="inline-flex" />{" "} */}
                            <span className="title-font text-foreground flex items-center gap-1 text-xs font-light">
                              {/* Next: Rank #{rankIdx - 1} {upNextRank.name} */}
                              Rank {rankIdx} <ArrowRightIcon size={10} strokeWidth={2.5} className="inline-flex items-center" /> {rankIdx - 1} {rankIdx <= 0 ? rankDistribution[rankIdx + 1].name : rankDistribution[rankIdx - 1].name}
                              {/* , on {item.timerStarted}{" "} */}
                              {/* <Dot
                          size={14}
                          strokeWidth={2}
                          className="inline-flex"
                          />
                          Started {moment(startDate).fromNow()} */}
                            </span>
                            <span className="text-foreground inline-flex items-center gap-1 text-xs font-light">
                              <Dot size={14} strokeWidth={2} className="inline-flex" /> Failure Count: <span className="text-red-600 dark:text-red-400">{item.failures}</span> <Dot size={14} strokeWidth={2} className="inline-flex" />{" "}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <span className="underline">Reset</span>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                      <ScrollArea className="h-[75vh]">
                                        <Agreement />
                                      </ScrollArea>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleResetTimer}>Continue to Reset</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </span>
                          </div>
                        </div>
                      </section>
                    );
                  })
                :  
    "Refresh to initialize timers"
                }
            </section>
            <section>
              <div className="bg-card rounded-lg border p-4 sm:rounded-lg">
                <div className="mb-2 flex flex-col gap-0 border-b pb-2">
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    Ranks <span className="bg-primary/30 text-primary rounded-full px-2 py-1 text-xs font-bold">{rankDistribution.length}</span>
                  </h2>
                  <span className="text-secondary-foreground/60 text-xs"> Ranking table</span>
                </div>
                <Table>
                  <TableCaption>Get back to work</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankDistribution.map((item, index) => (
                      // holographic efffect on top ranks
    
                      (<TableRow key={index}>
                        <TableCell>
                          <div className="item-center mr-2 inline-flex items-center justify-center">
                            <div className={`h-2 w-2 ${item.bgColor}`}></div>
                            {/* <div
                          className={`absolute z-2 h-2 w-2 ${item.color}`}></div>
                        <div
                          className={`h-2 w-2 animate-ping ${item.color}`}></div> */}
                          </div>
                          {item.name}
                        </TableCell>
                        <TableCell>
                          {item.hours}H/{item.hours < 24 ? `${(item.hours / 24).toFixed(1)}D` : `${item.hours / 24}D`}
                        </TableCell>
                      </TableRow>)
                    ))}
    
                    {/* <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">.00</TableCell> */}
                  </TableBody>
                </Table>
              </div>
            </section>
          </main>
        </>
  )
}
