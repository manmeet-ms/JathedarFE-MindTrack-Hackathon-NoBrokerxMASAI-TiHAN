import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { PieChartIcon } from "lucide-react";
  
  import React from "react";

const YouVsAverageIdeal = () => {
    const listsPoints=[
        {
            area:"",
            points:[''

            ]
        }
    ]
    const playOpenSwooshSound =async ()=>{
        const swooshSoundAudio = new Audio("/audio/alert-notification.wav");
        swooshSoundAudio.currentTime = 0.20
        await swooshSoundAudio.play()
        
      }
    const invoices = [
        {
          invoice: "INV001",
          paymentStatus: "Paid",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV002",
          paymentStatus: "Pending",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV003",
          paymentStatus: "Unpaid",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        
      ]
  return (
    <div className="bg-accent/10 m-4 rounded-2xl border px-4 py-6 ">
      <div className="mx-auto lg:px-8">
        <div className="flex items-center justify-between">
          <div className="w-2/3">
            {" "}
            <span
              // className="bg-accent/60 border border-accent text-primary type-mono rounded px-2 py-1 pb-0.5 text-[10px] font-semibold uppercase"
              className="text-primary type-mono rounded py-1 pb-0.5 text-xs font-semibold uppercase">
              Get to the top 1%.
            </span>
            <h1 className="mt-1 text-2xl font-bold">Let's talk data </h1>
            <span className="text-muted-foreground text-sm">
              Percentage check with ideally best at same prime level. Click{" "}
              <PieChartIcon
                size={20}
                className=" bg-muted/70 text-foreground border-muted-foreground/60 mb-0.5 inline rounded-md border p-1"
              />{" "}
              to see your achievments with the best version
            </span>
          </div>
          {/* <div className="flex gap-2  items-center"> */}
          <Dialog>
            <DialogTrigger>
                <span className="flex items-center justify-center bg-primary p-2  px-4 rounded-md text-accent " ><PieChartIcon size={16} strokeWidth={2.5} className="inline-flex mr-1 items-center " />
                {(
                  ((8 / 21) * 100 +
                    (161 / 696) * 100 +
                    (((400 / (800000 + 700000) / 80) * 2) / 1000) * 100) /
                  3
                ).toFixed(1)}
                %</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What you'd have acheived</DialogTitle>
                <DialogDescription>
                 
                   
                    <span className="py-2" >brain is cooked now, with shortform doomscrolled content</span>
                <div className="flex">
                <div className="w-1/3 text-left ">
                    <h1>Nuksaan</h1>
                  <ol>
                    <li>
                      brain itna kamzor hogya h , cheexein bhulne laga h , calc
                      me dikat
                    </li>
                    <li>bhulne k chakkar me phone screen scrack hogyi t😤</li>
                  </ol></div>
               <div className="w-1/3 text-left "> 
                <h1>  Fayda/Alternatives</h1>
                  <ol>
                    <li>learn articulation</li>
                    <li>you shoulds be reading manipulation books</li>
                    <li>Books you've purchased complete them</li>
                  </ol></div>
                  <div className="w-1/3 text-left ">
                    <h1>where your ideal would've been</h1>
                     
                  <ol>
                    <li>
                      in previous years, your brain was meant to solve complex +
                      mathematical problems, reading research papers books
                      and.{" "}
                    </li>
                    <li>academic overachiever</li>
                    <li>you should be building projects SaaS </li>
                    <li>you should have learnt AI/ML </li>
                    <li>you should have read so many books you downloaded.</li>
                  </ol>
                  </div>
                </div>
               
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {/* </div> */}
        </div>
        <hr className="m-3 mb-6" />
        <dl className="mt-2 grid grid-cols-4 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col">
            <dt className="text-muted-foreground pt-1 text-sm">
              Currently working <span className="font-semibold">~8H</span>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-accent-foreground/40 dark:text-muted block pb-1 text-[10px] font-normal tracking-tight capitalize">
                Prime work hrs
              </span>
              20H+
            </dd>
          </div>

          <div className="mx-auto flex max-w-xs flex-col">
            <dt className="text-muted-foreground pt-1 text-sm">
              Current streak <span className="font-semibold">~{23 * 7}H</span>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-accent-foreground/40 dark:text-muted block pb-1 text-[10px] font-normal tracking-tight capitalize">
                Avg Ideal streak{" "}
              </span>
              {24 * 29}H
            </dd>
          </div>

          <div className="mx-auto flex max-w-xs flex-col">
            <dt className="text-muted-foreground pt-1 text-sm">
              Lifetime earning{" "}
              <span className="font-semibold">
                ₹{Math.floor(90035 / 1000)}k+
              </span>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-accent-foreground/40 dark:text-muted block pb-1 text-[10px] font-normal tracking-tight capitalize">
                Avg p.a. check
              </span>
              {(800000 + 700000) / 2 / 100000}Lc
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col">
            <dt className="text-muted-foreground pt-1 text-sm">
              My net funds{" "}
              <span className="font-semibold">
                ~₹{Math.floor(50000 / 1000)}k
              </span>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-accent-foreground/40 dark:text-muted block pb-1 text-[10px] font-normal tracking-tight capitalize">
                Lifetime funds{" "}
              </span>
              {(Math.floor(80000 * 12 * 40) / 10000000).toFixed(1)}Cr
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default YouVsAverageIdeal;
