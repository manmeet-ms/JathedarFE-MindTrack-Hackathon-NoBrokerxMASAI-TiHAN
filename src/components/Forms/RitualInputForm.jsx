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
import { setPt } from "../../store/pointsSlice.js";
 
import { Textarea } from "@/components/ui/textarea";

import dayjs from 'dayjs';
import { SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { checkInRitual, getTodayRitual } from '../../services/ritual.service';
import { useSound } from "react-sounds";
import { applyPointsSrv_FE_Url } from "../../services/points.service";
import { EVENT_POINTS } from "../../utils/point.utils";
import { IconPlus } from "@tabler/icons-react";

export default function RitualInputForm() {
  const {play}=useSound('ui/window_open')
  
  const [vow, setVow] = useState("");
  const [submitted, setSubmitted] = useState(false);
 const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleSubmit = async () => {
    if (!vow.trim()) return;
 const updatedPoints = await applyPointsSrv_FE_Url("RITUAL_CREATED_CREDIT");
 
// TODO play sound on toast default?
                 toast(`Points credited: ${EVENT_POINTS.RITUAL_CREATED_CREDIT}. Great work`, {
                   position: "top-center",
                                  description: `Updated Balance: ${updatedPoints.data.points}`,
                                  action: {
                                    label: "Back to work",
                                    onClick: () => navigate("/"),
                                  },
                                });
    dispatch(setPt(updatedPoints.data.points));
    await checkInRitual(vow);
    await getTodayRitual()
    localStorage.setItem("ritual_checkin_" + dayjs().format("YYYY-MM-DD"), vow);
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <Button  variant="disabled" className="bg-green-800/30 text-green-400" >
           
           Submitted</Button>
    
        {/* <p className="max-w-md text-center">{vow}</p> */}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
  <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button onClick={play} variant="outline">
             <IconPlus />Ritual    

            {/* <SparklesIcon /> Add Ritual */}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Daily Ritual Check-In</DialogTitle>
            <DialogDescription>
                       Accomplish what you want to

            </DialogDescription>
          </DialogHeader>
           <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-3">
                <Textarea
                  placeholder="Enter your vow, commitment, or reflection for today..."
                  value={vow}
                  onChange={(e) => setVow(e.target.value)}
                  className="my-4 h-24"
                />
              </div>
              {/* <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div> */}
           
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
               <div className="flex flex-col gap-3">
                <Button onClick={handleSubmit} className="w-full">
                  Submit Ritual
                </Button>
                  
              </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  );
}

// import { useState } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { checkInRitual } from '../services/ritual.service'
// import dayjs from 'dayjs'

// const RitualInput = () => {
// const [vow, setVow] = useState('')
// const [submitted, setSubmitted] = useState(false)

// const handleSubmit = async () => {
// if (!vow.trim()) return

// await checkInRitual(vow)
// localStorage.setItem('ritual_checkin_' + dayjs().format('YYYY-MM-DD'), vow)
// setSubmitted(true)

// }

// if (submitted) {
// return (
// <div className="changed-px p-4 flex flex-col items-center justify-center">
// <h1 className="text-2xl text-green-500 mb-4">✅ Ritual Complete</h1>
// <p className="text-center max-w-md">{vow}</p>
// </div>
// )
// }

// return (
// <div className="changed-px p-4 flex flex-col items-center">
// <Card className="w-full max-w-xl">
// <CardContent className="changed-px p-4">
// <h2 className="text-xl font-bold mb-4">Daily Ritual Check-In</h2>
// <Textarea
// placeholder="Enter your vow, commitment, or reflection for today..."
// value={vow}
// onChange={(e) => setVow(e.target.value)}
// className="mb-4"
// />
// <Button onClick={handleSubmit} className="w-full">Submit Ritual</Button>
// </CardContent>
// </Card>
// </div>
// )
// }

// export default RitualInput
