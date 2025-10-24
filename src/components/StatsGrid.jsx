import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";


export function StatsGrid({ statsDataProp }) {
  if (!statsDataProp) return null;
  // console.log(statsDataProp);

  let disciplineScore = ((statsDataProp.completedBlocks / statsDataProp.totalBlocks) * 100).toFixed(0);

  const items = [
    {
      label: "Total Blocks",
      trend: "+12.5%", // if calculated
      value: statsDataProp.totalBlocks,
      quote: "Keep the fire alive.",
    },
    {
      label: "Strict Blocks",
      quote: "No room for excuses.",
      trend: "+12.5%", // if calculated
      value: statsDataProp.missedBlocks,
    },
    {
      label: "Completed",
      trend: "+12.5%", // if calculated
      quote: "Discipline in action.",
      value: statsDataProp.completedBlocks,
    },
    {
      label: "Discipline",
      trend: "+12.5%", // if calculated
      quote: "Consistency breeds results.",
      value: `${disciplineScore}%`,
    },
    //     {
    //   label: "Blocks Missed",
    //   value: statsDataProp.missedBlocks,
    //   quote: "Don't let it slip.",
    //   trend: "-8.2%", // if calculated
    //   icon: <IconAlertTriangle />
    // },

    // {
    //   label: "Lenient Blocks",
    //   value: statsDataProp.lenientBlocks,
    //   quote: "A bit more flexible.",
    //   icon: <IconClock />
    // },

    // {
    //   label: "Streak (days)",
    //   value: statsDataProp.currentStreak,
    //   icon: <IconFlame />
    // }
    // { label: "Today's Ritual", trend:"pre de", quote:"Lorem", value: `${statsDataProp.ritualStatus?`${statsDataProp.ritualStatus.length}`:0}` }
  ];

//   const dispatch = useDispatch();
//   const hasRun = useRef(false);

// useEffect(() => {
//   if (disciplineScore === 100 && !hasRun.current) {
//     hasRun.current = true;
//     applyPointsSrv("ALL_DAILY_COMPLETE_CREDIT").then((updatedPoints) => {
//       dispatch(setPt(updatedPoints?.data?.points));
//     });
//   }
// }, [disciplineScore, dispatch]);
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4   *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:changed-px px-4 @sm/main:grid-cols-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {items.map((item, idx) => (
          <Card key={idx} className="@container/card">
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">{item.value}</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp className="text-green-400" />
                  {item.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              {/* <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div> */}
              <div className="text-muted-foreground">{item.quote}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
