import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { IconInfoCircle, IconPlus, IconWashDryShade } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { applyPointsSrv } from "../services/points.service";
import { createHourlyCheckinSrv, getHourlyCheckinsSrv } from "../services/user.service";
import { setPt } from "../store/pointsSlice";
import { EVENT_POINTS } from "../utils/point.utils";

export const Route = createFileRoute("/timeline")({
  component: RouteComponent,
});

function RouteComponent() {  const moods = ["Happy", "Anxious", "Angry", "Stressed", "Sad", "Neutral", "Excited"];
  const tags = ["Work", "Study", "Social", "Exercise", "Rest"];

  const { setPageMeta } = usePageMeta();
  const { register, handleSubmit, control, setValue } = useForm();
  useEffect(() => {
    setPageMeta({ title: "Hourly Check-in Timeline", subtitle: "Chronological timeline tracking for the day." });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { play } = useSound("ui/window_open");

  const [checkinItemsDB, setCheckinItemsDB] = useState([]);
  const [submitted, setSubmitted] = useState();
  const [newEntry, setNewEntry] = useState();
  const tagArray = ["Working", "Code", "Study", "Distracted", "Rest"];
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);

  async function fetchCheckins() {
    try {
      const response = await getHourlyCheckinsSrv();
      console.log(response.data);

      setCheckinItemsDB(response.data);
    } catch (error) {
      console.error("Failed to fetch checkinItemsDB:", error);
    }
  }
  const onSubmit = async (data) => {
    console.log(data);

    createHourlyCheckinSrv(data);

    const updatedPoints = await applyPointsSrv("DIARY_WRITING_CREDIT");

    // TODO play sound on toast default?
    toast(`Points credited: ${EVENT_POINTS.DIARY_WRITING_CREDIT}. Great work`, {
      position: "top-center",
      description: `Updated Balance: ${updatedPoints.data.points}`,
      action: {
        label: "Back to work",
        onClick: () => navigate("/"),
      },
    });
    dispatch(setPt(updatedPoints.data.points));

    localStorage.setItem("hourly_checkin_" + dayjs().format("YYYY-MM-DD"), checkinItemsDB);
    setSubmitted(true);
    setOpen(false);
    fetchCheckins();
  };
  useEffect(() => {
    fetchCheckins();
    console.log(checkinItemsDB);
  }, []);
  // const payload = {
  //   title: "What are you doing?",
  //   body: "Log what you are doing",
  //   vibrate: [200, 100, 200],
  //   icon: "/assets/pwa-icons/icons/icon-128x128.png",
  //   badge: "/assets/pwa-icons/icons/icon-48x48.png",
  //   actions: [
  //     {
  //       action: "write-up",
  //       type: "text",
  //       title: "Write",
  //     },
  //   ],
  // };

  return <>
        <section className="p-4">
          <div className="md:hidden mb-4  border-b flex flex-col gap-0   pb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              Timeline
              <Badge>
                <IconWashDryShade />
                Entries {checkinItemsDB.length}/24{" "}
              </Badge>
            </h2>
            <span className="text-secondary-foreground/60 text-xs"> Chronological timeline tracking for the day.</span>
          </div>
          {checkinItemsDB.map((checkin) => (
            <div key={checkin?._id} className="flex gap-x-3">
              {/* Time */}
              <div className="min-w-14 text-end">
                <span className="text-xs text-muted-foreground">{dayjs(checkin?.createdAt).format("hh:mm a")}</span>
              </div>
  
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border">
                <div className="relative  size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-muted-foreground"></div>
                </div>
              </div>
  
              {/* Content */}
              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-foreground">{checkin?.note}</h3>
  
                <p className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-1">
                  <Badge>{checkin?.tag}</Badge>
                  {/* <span className="px-1.5 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"></span> */}
                  <Dialog>
                    <DialogTrigger>
                  
                  <Badge className="mx-0.5    bg-accent/80  text-primary" >
                  <IconInfoCircle className="inline size-3"/>   {checkin?.mood?.moodType} | {checkin?.mood?.intensity}
                  </Badge>
  
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mood tracker information</DialogTitle>
                        <DialogDescription>
  
                          <Table asChild>
                            <TableCaption>Mood tracker information as of {checkin.entryDate}</TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Parameter</TableHead>
                                <TableHead>Value</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="text-left" >
                              <TableRow>
                                <TableCell>Trigger</TableCell>
                                <TableCell>{checkin?.mood?.trigger}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Location</TableCell>
                                <TableCell>{checkin?.mood?.location}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Physical state</TableCell>
                                <TableCell>{checkin?.mood?.physicalState}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Notes</TableCell>
                                <TableCell>{checkin?.mood?.notes}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                         
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </p>
              </div>
            </div>
          ))}
  
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="fixed bottom-24 md:bottom-8 right-4">
              <Button>
                <IconPlus />
                {/* Add to Timeline */}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hourly Checkin</DialogTitle>
                <DialogDescription>What are you doing?</DialogDescription>
              </DialogHeader>
  
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-4">
                {/* Note Entry */}
                <div className="grid gap-2">
                  <Label>Activity Note</Label>
                  <Textarea {...register("note")} required placeholder="What did you do this hour?" className="h-24" />
                </div>
  
                {/* Tag */}
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select onValueChange={(val) => setValue("tag", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((tag, idx) => (
                        <SelectItem key={idx} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
  
                {/* Mood Type */}
                <div className="grid gap-2">
                  <Label>Mood</Label>
                  <Controller
                    name="mood.moodType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          {moods.map((mood, idx) => (
                            <SelectItem key={idx} value={mood}>
                              {mood}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
  
                {/* Intensity */}
                <div className="grid gap-2">
                  <Label>Intensity (1–10)</Label>
                  <Controller
                    name="mood.intensity"
                    control={control}
                    defaultValue={5}
                    render={({ field }) => (
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value?.toString()} className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                          <div key={val} className="flex items-center gap-1">
                            <RadioGroupItem value={val.toString()} id={`intensity-${val}`} />
                            <Label htmlFor={`intensity-${val}`}>{val}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
  
                {/* Other Mood Fields */}
                <div className="grid gap-2">
                  <Label>Trigger</Label>
                  <Input {...register("mood.trigger")} placeholder="e.g. deadline, argument" />
                </div>
  
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input {...register("mood.location")} placeholder="e.g. home, office" />
                </div>
  
                <div className="grid gap-2">
                  <Label>Physical State</Label>
                  <Input {...register("mood.physicalState")} placeholder="e.g. tired, rested" />
                </div>
  
                <div className="grid gap-2">
                  <Label>Mood Notes</Label>
                  <Textarea {...register("mood.notes")} placeholder="Additional mood details" className="h-16" />
                </div>
  
                <Button type="submit" className="w-full">
                  Submit Check-in
                </Button>
              </form>
  
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <div className="flex flex-col gap-3">
                  <Button onClick={handleSubmit} className="w-full">
                    Submit Ritual
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    Login with Google
                  </Button> */}
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
  
        {/* <Button onClick={() => sendTestNotification(payload)}>push</Button> */}
      </>
}