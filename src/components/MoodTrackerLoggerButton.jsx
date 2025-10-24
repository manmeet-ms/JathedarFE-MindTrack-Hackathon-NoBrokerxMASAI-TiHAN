import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { ScanFaceIcon, ShredderIcon } from "lucide-react";
import { useState } from "react";
import { logUrgeService } from "../services/urge.service.js";
import { faker } from "@faker-js/faker";
import { useSound } from "react-sounds";
import { IconPlus } from "@tabler/icons-react";

export default function MoodTrackerLoggerButton({ refetchUrges }) {
  const [uIntensity, setUrgeIntensity] = useState();
  const [uType, setUrgeType] = useState();
  const [uTrigger, setUrgeTrigger] = useState();
  const [uLocation, setUrgeLocation] = useState();
  const [uNotes, setUrgeNotes] = useState();
  const [open, setOpen] = useState(false);
const {play}=useSound('ui/window_open')

  const handleUrgeSubmit = () => {
    const capturedFormData = {
      urgeTimeStamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      urgeIntensity: uIntensity,
      urgeType: uType || faker.airline.aircraftType(),
      urgeTrigger: uTrigger || faker.airline.aircraftType(),
      urgeLocation: uLocation || faker.airline.aircraftType(),
      urgeResolved: false,
      urgeNotes: uNotes || faker.lorem.lines(2),
    };
    logUrgeService(capturedFormData);
    refetchUrges();
    setOpen(false);
  };

  const urgeTypes = [
    "procrastination",
    "distraction",
    "doomscroll",
    "addiction",
    // "other",
  ];

  const urgeTriggers = [
    "boredom",
    "stress",
    "avoiding hard task",
    "mindless routine",
    "dopamine craving",
    "seeking comfort",
    "social media",
    "habitual time (e.g., after lunch, before bed)",
    "seeing others online",
    "tiredness",
    "overwhelmed",
    "no clear goal",
    "peer influence",
  ];

  const urgeLocations = ["bedroom", "workspace", "alone", "in public"];

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button  onClick={()=>play()}  variant="outline">
 <IconPlus /> Mood          </Button>
 {/* <ScanFaceIcon /> Mood Tracker          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log the  urge</DialogTitle>
            <DialogDescription>And let it go. Accomplish the important things</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Urge Intensity */}
            <div>
              {/* <Label className="my-4" htmlFor="urgeIntensity">Urge Intensity</Label> */}
              <Input
                id="urgeIntensity"
                type="number"
                placeholder="Urge Intensity"
                onChange={(e) => setUrgeIntensity(e.target.value)}
              />
            </div>
            {/* Urge Type */}{" "}
            <div>
              {/* <Separator /> */}
              <Label className="my-4">Type</Label>
              <RadioGroup
                onValueChange={setUrgeType}
                className="mt-4 flex flex-wrap gap-4">
                {urgeTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem className="cursor-pointer" value={type} id={type} />
                    <Label htmlFor={type} className="capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>{" "}
            <div>
              {/* <Separator /> */}
              <Label className="my-4">Location</Label>
              <RadioGroup
                onValueChange={setUrgeLocation}
                className="mt-4 flex flex-wrap gap-4">
                {urgeLocations.map((loc) => (
                  <div key={loc} className="flex items-center space-x-2">
                    <RadioGroupItem className="cursor-pointer" value={loc} id={loc} />
                    <Label htmlFor={loc} className="capitalize">
                      {loc}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {/* Urge Trigger */}
            <div>
              {/* <Separator /> */}
              <Label className="my-4">Trigger</Label>
              <ScrollArea className="h-[200px] rounded-md border px-4">
                <RadioGroup
                  onValueChange={setUrgeTrigger}
                  className="mt-4 flex flex-wrap gap-4">
                  {urgeTriggers.map((trigger) => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <RadioGroupItem className="cursor-pointer" value={trigger} id={trigger} />
                      <Label htmlFor={trigger} className="capitalize">
                        {trigger}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </ScrollArea>
            </div>
            {/* Urge Location */}
            {/* Urge Notes */}
            <div>
              {/* <Label className="my-4"  htmlFor="urgeNotes">Notes</Label> */}
              <Textarea
                id="urgeNotes"
                onChange={(e) => setUrgeNotes(e.target.value)}
                placeholder="Write details..."
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose  asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button   
                     onClick={handleUrgeSubmit}>
              Submit Ritual  
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
