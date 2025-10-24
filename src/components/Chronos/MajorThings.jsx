import React from "react";
import { MAJOR_THINGS_I_MANAGE } from "../conf/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
const MajorThings = () => {
  return (
    <section className="m-4 p-2">
                            <h1 className="title-font text-foreground mb-3 text-lg align-baseline font-medium">
                        Major things I manage <Badge className="size-4  rounded-full">{MAJOR_THINGS_I_MANAGE.length}</Badge>
                        <span className="text-muted-foreground block text-xs font-normal">
                          Check the reality tasks, then go forward wasting your time.                        
                        </span>
                      </h1>

      {MAJOR_THINGS_I_MANAGE.map((i, idx) => (
        <div key={idx} >
        {i.name.length>0 &&
            (
<div className="my-1 flex items-center space-x-2">            <Checkbox id="tasks" />
          
            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">{i.name}</Label></div>
          )
        }
        </div>
      ))}
    </section>
  );
};

export default MajorThings;
