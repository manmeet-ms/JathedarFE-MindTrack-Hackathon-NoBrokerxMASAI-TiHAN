import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { completeBlock, getTodayBlocks } from "@/services/timeblock.service";
import { IconProgressBolt } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSound } from "react-sounds";
import { toast } from "sonner";

import api from "../services/api";
import { applyPointsSrv_FE_Url } from "../services/points.service";
import { setPt } from "../store/pointsSlice";
import { EVENT_POINTS } from "../utils/point.utils";
import { getRandomTaunt } from "../utils/taunts.utils";

const TimeBlockCard = () => {
  const dispatch = useDispatch();
  const { play } = useSound("ui/success_bling");

  const [blocks, setBlocks] = useState([]);

  const [activeBlockId, setActiveBlockId] = useState(null);
  useEffect(() => {
    getTodayBlocks().then((res) => setBlocks(res.data));
  }, []);
  const handleComplete = async (id) => {
    await completeBlock(id);
    const res = await getTodayBlocks();
    setBlocks(res.data); // refresh
    const updatedPoints = await applyPointsSrv_FE_Url("TIMEBLOCK_COMPLETE_CREDIT");

    console.log(updatedPoints);
    // TODO complete all blocks either do a cron or detect the last mark done
    dispatch(setPt(updatedPoints.data.points));
    toast(`Points credited: ${EVENT_POINTS.TIMEBLOCK_COMPLETE_CREDIT}. Great work`, {
      position: "top-center",
      description: `Updated Balance: ${updatedPoints.data.points}`,
      action: {
        label: "Back to work",
        onClick: () => navigate("/"),
      },
    });
  };

  useEffect(() => {
    const checkActiveBlock = () => {
      const now = dayjs();
      const currentTime = now.format("HH:mm");

      const active = blocks.find((block) => {
        const start = block.start || block.startTime;
        const end = block.end || block.endTime;
        const completed = block.completed;
        // TODO:   CHECK FOR STABILITY ;;;; TESTING check start time endtime and log notification
        if (currentTime == start) {
          // console.log(`${block.task} :: Block Started :: log the notification`);
          const payload = {
            title: `${block.task} just started`,
            body: `${block.startTime} – ${block.endTime} ${block.description}.`,

            vibrate: [200, 100, 200],
            actions: [
              {
                action: "task-on-it",
                type: "button",
                title: "On it",
              },
              {
                action: "task-about-to-go",
                type: "button",
                title: "About to go",
              },
            ],
          };
          api.post(`/notifications/trigger`, payload);
        }
        if (currentTime == end) {
          // console.log(`${block.task} :: Block Ended :: log the notification`);

          const payload = {
            title: `${block.task} just ended`,
            body: `${block.startTime} – ${block.endTime} ${block.description}.`,

            vibrate: [200, 100, 200],
          };
          api.post(`/notifications/trigger`, payload);
        }
        if (currentTime > end && completed === false) {
          // console.log(`${block.task} :: Block Missed :: taunt`);
          const payload = {
            title: `${block.task} MISSED!`,
            body: getRandomTaunt(),
            vibrate: [200, 100, 200],
            actions: [
              {
                action: "task-completed",
                type: "button",
                title: "Completed",
              },
              {
                action: "task-excuse",
                type: "button",
                title: "Excuse",
              },
            ],
          };
          api.post(`/notifications/trigger`, payload);
        }

        return currentTime >= start && currentTime < end;
      });

      setActiveBlockId(active?._id || null);
    };

    checkActiveBlock();
    const interval = setInterval(checkActiveBlock, 60 * 1000);
    return () => clearInterval(interval);
  }, [blocks]);

  return (
    <>
      <div className="bg-card rounded-lg border p-4">
        <h2 className="mb-2 text-xl font-semibold">
          Timeblocks
          <span className="bg-primary/20 text-primary ml-2 rounded-full px-2 py-1.25 text-xs font-bold">{blocks.length}</span>
        </h2>
        <Table>
          {/* <TableCaption>At vero eos et iusto odio</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="">Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => {
              const isActive = block._id === activeBlockId;
              return (
                <TableRow key={block._id}>
                   <TableCell>
                    {!block.completed ? (
                      <span 
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer font-medium text-primary"
                        onClick={() => {
                          handleComplete(block._id);
                          play();
                        }}
                        >
                        Complete
                      </span>
                      // <Checkbox className="mx-auto border ml-2 " onClick={() => {
                      //     handleComplete(block._id);
                      //     play();
                      //   }} /> 
                    ) : (
                      <span variant="disabled" size="sm" className="text-muted-foreground/40">
                        Completed
                      </span>
                        //  <Checkbox className="mx-auto border ml-2 " checked disabled/>
                    )}
                  </TableCell>
                  <TableCell>
                    {block.startTime} - {block.endTime}
                  </TableCell>
                  <TableCell>
                  <div className="flex flex-col justify-start items-start ">
                            {" "}
                            <span>
                              {block.task} {block.strict && <IconProgressBolt className="inline size-5 bg-secondary/20 text-primary rounded-full p-0.75 font-medium " />}
                            </span>
                            <span className="  text-xs text-muted-foreground/60 ">
                              {isActive ? (
                                <div className="mr-1 inline-flex items-center justify-center">
                                  <div className="size-2 animate-ping rounded-full bg-green-400"></div>
                                  <div className="absolute size-2 rounded-full bg-green-400"></div>
                                </div>
                              ) : (
                                <div className="mr-1 inline-flex items-center justify-center">{block.completed ? <div className="  mr-0.5  size-2 rounded-full bg-green-800 dark:bg-green-400/90"></div> : <div className="  mr-0.5  size-2 rounded-full bg-red-800 dark:bg-red-400/90 "></div>}</div>
                              )}
                              {block.description}
                            </span>
                          </div>
                  </TableCell>
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TimeBlockCard;
