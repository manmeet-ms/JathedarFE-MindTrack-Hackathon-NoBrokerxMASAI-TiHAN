import Masonry from '@mui/lab/Masonry';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dot,
  ExternalLinkIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { APP_LONG_DESCRIPTION } from "../../shared/constants";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { useEffect } from 'react';

const Agreement = () => {
    const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Agreement',
subtitle:'Commitments and Promises to Oneself'
});
  }, []);
  return (
    <>
    
      <section className="bg-background flex h-full flex-wrap overflow-hidden rounded-lg px-4">
       <div className="grid grid-cols-3">
         
         
         
         
       </div>
          <Masonry columns={{ xs: 1, sm: 1,md:2 }} spacing={2}>
      
          <div className=" rounded-lg border changed-px p-4">
            <span
              // className="bg-accent/60 border border-accent text-primary type-mono rounded px-2 py-1 pb-0.5 text-[10px] font-semibold uppercase"
              className="text-primary type-mono text-md rounded py-1 pb-0.5 font-semibold uppercase">
              {APP_LONG_DESCRIPTION.content}
            </span>{" "}
            {/* <ScrollArea className="mt-1 h-[375px] rounded-md border border-none"> */}
            <h1 className="title-font text-foreground my-3 text-3xl font-medium">
              Agreement before proceeding
              <span className="text-muted-foreground block font-normal">
                Check the reality of tasks, then go forward.
                
                
              </span>
            </h1>
            {APP_LONG_DESCRIPTION.tasksBeforeProceeding.map((i, idx) => (
              <div
                key={idx}
                className="my-1 flex items-center justify-start space-x-2">
                <Checkbox className="size-5 rounded-full " id="tasks" />
                <label
                  htmlFor="tasks"
                  className="relative   peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {i}
                </label>
              </div>
            ))}
          </div>
          <div className=" rounded-lg border changed-px p-4">
            {" "}
            <h1 className="title-font text-foreground mt-4 mb-3 text-3xl font-medium">
              Warnings and Reality
            </h1>
            {APP_LONG_DESCRIPTION.warningBeforeProceeding.map((i, idx) => (
              <div key={idx} className="my-1 items-center space-x-2">
                <TriangleAlertIcon
                  className="mr-2 inline animate-pulse text-red-600 transition-all duration-300 ease-in-out"
                  size={16}
                />
                {i}
              </div>
            ))}
          </div>
          <div className=" rounded-lg border changed-px p-4">
            {" "}
            <h1 className="title-font text-foreground mb-3 text-3xl font-medium">
Major life tasks 
              <span className="text-muted-foreground block font-normal">
                You need to understand this
              </span>
            </h1>
            <ol className="my-6">
              {APP_LONG_DESCRIPTION.bulletPoints.map((i, idx) => (
                <li key={idx} className="my-0.5">
                  {" "}
                  <Dot className="inline-flex" size={14} strokeWidth={2} /> {i}
                </li>
              ))}
            </ol>
          </div>

          <div className=" rounded-lg border changed-px p-4">
            {" "}
            <h1 className="title-font text-foreground my-6 mb-3 text-3xl font-medium">
              Things I am Managing
              <span className="text-muted-foreground block text-xl font-normal">
                Check these, if you still think you've got time
              </span>
            </h1>
            {APP_LONG_DESCRIPTION.thingsImManaging.map((i, idx) => (
              <div
                key={idx}
                className="my-1 flex items-center space-x-2 px-0.5">
                <InfoIcon
                  className="text-primary mr-2 inline-flex transition-all duration-300 ease-in-out"
                  size={14}
                />
                {i}
              </div>
            ))}
          </div>
          
    </Masonry>
        
        {/* </ScrollArea> */}
        {/* <div className="flex flex-wrap items-center">
                      <Button onClick={() => setAgreementOpen(false)}>
                        Close
                      </Button>
                    </div> */}
      </section>
    </>
  );
};

export default Agreement;
