import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { ShredderIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSound } from "react-sounds";
import { toast } from "sonner";

import { applyPointsSrv } from "../../services/points.service.js";
import { logUrgeService } from "../../services/urge.service.js";
import { setPt } from "../../store/pointsSlice.js";
import { EVENT_POINTS } from "../../utils/point.utils.js";
import { IconPlus } from "@tabler/icons-react";

export default function UrgeInputForm({ refetchUrges }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { play } = useSound("ui/window_open");

  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      urgeIntensity: "6",
      urgeType: "doomscroll",
      urgeTrigger: "being alone",
      urgeLocation: "bedroom",
      urgeNotes: "",
    },
  });

  const urgeTypes = ["procrastination", "distraction", "doomscroll", "addiction"];

  const urgeTriggers = ["boredom", "stress", "avoiding hard task", "mindless routine", "dopamine craving", "seeking comfort", "social media", "habitual time (e.g., after lunch, before bed)", "seeing others online", "tiredness", "overwhelmed", "no clear goal", "peer influence"];

  const urgeLocations = ["bedroom", "workspace", "alone", "in public"];

  const onSubmit = async (data) => {
    const updatedPoints = await applyPointsSrv("URGE_LOGGED_CREDIT");
    toast(`Points credited: ${EVENT_POINTS.URGE_LOGGED_CREDIT}. Great work`, {
      position: "top-center",
      description: `Updated Balance: ${updatedPoints.data.points}`,
      action: {
        label: "Back to work",
        onClick: () => navigate("/"),
      },
    });
    dispatch(setPt(updatedPoints.data.points));

    const capturedFormData = {
      urgeTimeStamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      urgeIntensity: data.urgeIntensity,
      urgeType: data.urgeType,
      urgeTrigger: data.urgeTrigger,
      urgeLocation: data.urgeLocation,
      urgeResolved: false,
      urgeNotes: data.urgeNotes,
      uid: user.id,
    };
    logUrgeService(capturedFormData);
    refetchUrges();
    setOpen(false);
    reset();
  };
   return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => play()} variant="outline">
            <IconPlus />Urge
            {/* <ShredderIcon /> Log Urge */}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log the Urge</DialogTitle>
            <DialogDescription>Track your urges and let them go. Focus on what matters.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Intensity */}
            <div>
              <Label className="my-2">Urge Intensity (1-10)</Label>
              <Controller
                control={control}
                name="urgeIntensity"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem className="size-5 border-2 border-foreground/40  cursor-pointer" value={`${idx +1}`} id={`intensity-${idx +1}`} />
                        <Label htmlFor={`intensity-${idx +1}`}>{idx +1}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Type */}
            <div>
              <Label className="my-2">Type</Label>
              <Controller
                control={control}
                name="urgeType"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                    {urgeTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem className="size-5 border-2 border-foreground/40  cursor-pointer" value={type} id={type} />
                        <Label htmlFor={type} className="capitalize">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Location */}
            <div>
              <Label className="my-2">Location</Label>
              <Controller
                control={control}
                name="urgeLocation"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                    {urgeLocations.map((loc) => (
                      <div key={loc} className="flex items-center space-x-2">
                        <RadioGroupItem className="size-5 border-2 border-foreground/40  cursor-pointer" value={loc} id={loc} />
                        <Label htmlFor={loc} className="capitalize">
                          {loc}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Trigger */}
            <div>
              <Label className="my-2">Trigger</Label>
              <ScrollArea className="h-[100px] rounded-md border p-2">
                <Controller
                  control={control}
                  name="urgeTrigger"
                  render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4">
                      {urgeTriggers.map((trigger) => (
                        <div key={trigger} className="flex items-center space-x-2">
                          <RadioGroupItem className="size-5 border-2 border-foreground/40  cursor-pointer" value={trigger} id={trigger} />
                          <Label htmlFor={trigger} className="capitalize">
                            {trigger}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </ScrollArea>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="urgeNotes" className="my-2">
                Notes
              </Label>
              <Textarea id="urgeNotes" placeholder="Write details..." {...register("urgeNotes")} />
            </div>
            {/* <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>From Presets</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2">
                  {[
{name:"Doomscroll",data:{
     urgeIntensity: "6",
      urgeType: "doomscroll",
      urgeTrigger: "alone",
      urgeLocation: "bedroom",
}},
{name:"Procrastination Trigger", data:{
     urgeIntensity: "6",
      urgeType: "doomscroll",
      urgeTrigger: "alone",
      urgeLocation: "bedroom",
}},
{name:"Partaap Affecting",data:{
     urgeIntensity: "6",
      urgeType: "doomscroll",
      urgeTrigger: "alone",
      urgeLocation: "bedroom",
}}

                  ].map((item,idx)=>(<span key={idx} variant="outline" >{item.name}</span>))}
                  

                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Fill Detailed Form</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-6">
               
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                Submit Ritual
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
