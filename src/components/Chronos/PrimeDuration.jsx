import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import moment from "moment/moment";
import React from "react";
import { globalBodyWidth } from "../conf/constants";

const PrimeDuration = () => {
  const playSFX =  () => {
    const ad = new Audio("/audio/notification-alert-269289.mp3");
    return ad.play();
  };
  const futureDate = new Date(Date.UTC(2028, 9, 1, 0, 0, 0));
  // Extract month abbreviation
  // const monthAbbr = startDate.format("MMM");
  // Extract day
  // const day = startDate.format("D");
  // Calculate time difference
  const now = Date.now();
  const diffDuration = futureDate.getTime() - now;
  // console.log("diffDuration",diffDuration._milliseconds);

  // Format time difference as HH:mm:ss
  const years = String(
    Math.floor(diffDuration / (365 * 24 * 60 * 60 * 1000))
  ).padStart(2, "0");
  const months = String(
    Math.floor(
      (diffDuration % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
    )
  ).padStart(2, "0");
  const days = String(
    Math.floor(
      (diffDuration % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
    )
  ).padStart(2, "0");
  const hours = String(
    Math.floor((diffDuration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((diffDuration % (60 * 60 * 1000)) / (60 * 1000))
  ).padStart(2, "0");
  const seconds = String(
    Math.floor((diffDuration % (60 * 1000)) / 1000)
  ).padStart(2, "0");
  const milli = String(Math.floor(diffDuration % 100)).padStart(2, "0");
  // const timeDiff = `${hours}h:${minutes}m:${seconds}s`;
  const timeDiff = `${years}:${months}:${days}:${hours}:${minutes}:${seconds}:${milli}`;
  return (
    <div className={` m-4 rounded-2xl  px-4 py-6  `}>
 
      <div className="mx-auto">
        <div className="flex h-10 items-center justify-between">
          <div className="w-[36vw]">
            {" "}
            <h1 className="text-2xl">Prime ends </h1>
            <span className="text-muted-foreground text-xs">
              on {futureDate.toUTCString().slice(0, -13)}
            </span>
          </div>
          <Separator className="mx-2" orientation="vertical" />
          {/* {timeDiff} */}
          <dl className="text-primary flex w-2/3 items-start gap-x-0 text-center font-light">
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                YY
              </dt>
              <dd className="text-md order-first font-semibold">{years}</dd>
            </div>
            <span className="font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                MM
              </dt>
              <dd className="text-md order-first font-semibold">{months}</dd>
            </div>{" "}
            <span className="font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                DD
              </dt>
              <dd className="text-md order-first font-semibold">{days}</dd>
            </div>{" "}
            <span className="font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                HR
              </dt>
              <dd className="text-md order-first font-semibold">{hours}</dd>
            </div>{" "}
            <span className="font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                MN
              </dt>
              <dd className="text-md order-first font-semibold">{minutes}</dd>
            </div>{" "}
            <span className="font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">
                SC
              </dt>
              <dd className="text-md order-first font-semibold">{seconds}</dd>
            </div>{" "}
            {/* <span className=" font-light">:</span>
            <div className="mx-auto flex flex-col">
              <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">SC</dt>
              <dd className=" order-first text-md font-semibold ">
                {milli}
              </dd>
            </div>{" "} */}
          </dl>
        </div>

        {/*  <dl className="mt-2 g font-lightrid grid-cols-7 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex flex-col">
            <dt className="text-accent-foreground/60 dark:text-accent-foreground/40 text-[10px]">YY</dt>
            <dd className="order-first font-medium ">
              {years}
            </dd>
          </div>
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">MM</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>{" "}
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">DD</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>{" "}
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">HR</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>{" "}
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">MN</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>{" "}
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">SC</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>{" "}
 font-light          <div className="mx-auto  flex flex-col">
            <dt className="text-muted-foreground pt-1 text-xs">ML</dt>
            <dd className="order-first text-lg font-medium ">
              {dd[10px]
          </div>
        </dl> */}
      </div>
    </div>
  );
};

export default PrimeDuration;
