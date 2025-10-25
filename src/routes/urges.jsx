import { Separator } from "@/components/ui/separator";
import { createFileRoute } from '@tanstack/react-router';
// TODO :   create a categoriezed bar chanr considtng triger:count multiple clolots
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Masonry from "@mui/lab/Masonry";
import relativeTime from "dayjs/plugin/relativeTime";
 
import { ChartBarInteractive } from "@/components/chart-bar-interactive.tsx";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { IconGrain } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Tally1Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { getUrgesService } from "../services/urge.service.js";

export const Route = createFileRoute('/urges')({
  component: RouteComponent,
})

function RouteComponent() {
   const { setPageMeta } = usePageMeta();
  
    useEffect(() => {
      setPageMeta({title:'Urges',
  subtitle:'Impulse recognition and control mechanisms'
  });
    }, []);

    
  const [fetchUrges, setfetchUrges] = useState([]);
  const [avgIntensity, setAvgIntensity] = useState();
  const [avgTimestamp, setAvgTimestamp] = useState();
  const [totalUrgesCount, setTotalUrgesCount] = useState();

  
  let datesSum = 0;
  let intensitiesSum = 0;

  useEffect(() => {
    fetchUrges.map((item) => {
      datesSum += dayjs(item.urgeTimeStamp).valueOf();
      intensitiesSum += item.urgeIntensity;
      setAvgTimestamp(dayjs(datesSum / fetchUrges.length).format("HH:mm"));
      setAvgIntensity(Number.parseInt(intensitiesSum / fetchUrges.length));
    });
  }, [fetchUrges]);

  // console.log(dayjs(datesSum / fetchUrges.length).format("HH:mm"));
  // console.log(intensitiesSum / fetchUrges.length);

  const getUrgesOnThisPage = async () => {
    
  const res = await getUrgesService();
      console.log("urges res.data",res.data);
      setfetchUrges(res.data)
      setTotalUrgesCount(res.data.length)
    };
  useEffect(() => {
    getUrgesOnThisPage();
  }, []);
  // console.log("fetchUrges", fetchUrges);

  dayjs.extend(relativeTime);
  return <div className="flex flex-col gap-4 p-4">
      {/* <UrgeInputForm refetchUrges={getUrgesOnThisPage} /> */}
      {/* <div className="fixed bottom-24 right-6" ><UrgeInputForm/></div> */}
      <div className="grid items-center justify-center gap-4 sm:grid-cols-1 lg:grid-cols-4">
        {" "}
        <ChartBarInteractive clx="col-span-3" urges={fetchUrges} />
        {/* <ScrollArea className="h-108 rounded-md border">
          <div className="p-4">
            <h4 className="mb-8 text-sm leading-none font-medium">Tags</h4>
            {fetchUrges.map((u, idx) => (
              <div className="my-2">
                <div className="">
                  <h4 className="text-sm leading-none font-medium capitalize">
                    {u.urgeType}{" "}
                  </h4>
                </div>
                <Separator className="my-1 opacity-10" />
                <div className="text-accent-foreground/40 flex h-5 items-center space-x-1 text-sm">
                  <div>
                    {u.urgeIntensity}
                    <span className="italic">i</span>{" "}
                  </div>
                  <DotIcon size={12} className="text-accent-foreground/20" />
                  <div className="capitalize">{u.urgeLocation}</div>
                  <DotIcon size={12} className="text-accent-foreground/20" />
                  <div> {dayjs(u.urgeTimeStamp).format("HH:MM A")}</div>
                </div>
                <Separator className="mt-1 mb-4 opacity-25" />
              </div>
              
            ))}
          </div>
        </ScrollArea> */}
        <Card className="relative left-4 lg:left-0">
          <CardHeader>
            {/* <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="mx-auto flex gap-4 self-center px-4 sm:justify-around sm:text-center lg:flex-col lg:text-left">
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-medium sm:text-5xl">
                  {totalUrgesCount}
                </p>
                {/* <p className="font-semibold">Total Urges</p> */}
                <p className="text-muted-foreground">Total Urges</p>
                {/* <p className="text-muted-foreground">From verified reviews</p> */}
              </div>
              <Separator className="hidden lg:inline" />
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-medium sm:text-5xl">
                  {avgIntensity}
                </p>
                {/* <p className="font-semibold">Average Intensity</p> */}
                <p className="text-muted-foreground">Average Intensity</p>
                {/* <p className="text-muted-foreground">Within first quarter</p> */}
              </div>
              <Separator className="hidden lg:inline" />
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-medium sm:text-5xl">
                  {avgTimestamp}
                </p>
                {/* <p className="font-semibold">Average Timestamp</p> */}
                <p className="text-muted-foreground">Average Timestamp</p>
                {/* <p className="text-muted-foreground">Within first quarter</p> */}
              </div>
            </div>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      </div>

 
 
      <div className=" w-full ">
        <Masonry columns={{ xs: 2, sm: 2, md: 3, xl: 4 }}>
          {fetchUrges.map((u, index) => {
            let pillBg;
            switch (u.urgeType) {
              case "procrastination":
                pillBg =
                  "bg-yellow-300/60 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-300";

                break;
              case "distraction":
                pillBg =
                  "bg-blue-300/60 text-blue-800 dark:bg-blue-800/40 dark:text-blue-300";

                break;
              case "doomscroll":
                pillBg =
                  "bg-rose-300/60 text-rose-800 dark:bg-rose-800/40 dark:text-rose-300";

                break;
              case "browsing":
                pillBg =
                  "bg-indigo-300/60 text-indigo-800 dark:bg-indigo-800/40 dark:text-indigo-300";

                break;
              case "addiction":
                pillBg =
                  "bg-red-300/60 text-red-800 dark:bg-red-800/40 dark:text-red-300";

                break;
              case "other":
                pillBg =
                  "bg-zinc-300/60 text-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300";

                break;

              default:
                break;
            }
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="">
                    {/* {dayjs(u.urgeTimeStamp).format("DD/MM/YYYY HH:mm:ss")} */}
                    {dayjs(u.urgeTimeStamp).format("DD/MM/YYYY HH:mm:ss")}
                  </CardTitle>
                  <CardDescription className="text-accent-foreground/40 flex items-center text-xs capitalize">
                    {u.urgeTrigger === null ? null : (
                      <div className="flex">
                        <span className=" ">{u.urgeTrigger}</span>
                        <Tally1Icon
                          size={12}
                          className="mt-0.5 ml-2 opacity-50"
                        />
                      </div>
                    )}
                    {dayjs(u.urgeTimeStamp).fromNow()}
                  </CardDescription>
                </CardHeader>
                <CardContent
                  className={`${u.urgeNotes === null ? "hidden" : "block"} line-clamp-2 text-pretty`}>
                  {" "}
                  {u.urgeNotes}
                </CardContent>
                <CardFooter className="flex flex-col items-start justify-start text-xs">
                  <div className="container flex items-center justify-between">
                    {" "}
                    <Link to={`.?category=${u.urgeType}`}>
                      <span
                        className={`${pillBg} inline-flex rounded px-1.5 py-0.75 text-xs tracking-wide capitalize`}>
                        {u.urgeType}
                      </span>
                    </Link>
                    <span className={`flex items-center gap-1  text-xs`}> <IconGrain size={12}  /> {u.urgeIntensity}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </Masonry>
      </div>
    
    </div>
}
