"use client";

import { getStreaksSrv } from "../../services/analytics.service.js";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type TimerStreakData = {
  id: string;
  label: string;
  user: string;
  data: { x: number; y: number }[];
};

export function ChartLineMoodTracker() {
  const [chartData, setChartData] = useState<Record<string, any>[]>([]);
  const [chartConfig, setChartConfig] = useState<
    Record<string, { label: string; color?: string }>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const res = await getStreaksSrv();
        const timers: TimerStreakData[] = res.data;

        // Merge data across all timers by timestamp
        const timeMap = new Map<number, Record<string, number | string>>();

        timers.forEach((timer) => {
          timer.data.forEach((point) => {
            const ts = point.x;
            if (!timeMap.has(ts)) {
              timeMap.set(ts, { timestamp: ts });
            }
            timeMap.get(ts)![timer.id] = point.y;
          });
        });

        const finalData = Array.from(timeMap.values()).sort(
          (a, b) => (a.timestamp as number) - (b.timestamp as number)
        );

        // Assign custom color per timer line
        const config: Record<string, { label: string; color?: string }> = {};
        timers.forEach((timer, idx) => {
          const presetColors = [
            "#1D4ED8",
            "#DC2626",
            "#059669",
            "#9333EA",
            "#F59E0B",
            "#2563EB",
          ];
          const color = presetColors[idx % presetColors.length];
          config[timer.id] = {
            label: timer.label,
            color: color,
          };
        });

        setChartData(finalData);
        setChartConfig(config);
      } catch (err) {
        console.error("Failed to load streak data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreaks();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Timer Streaks</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>Loading chart...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood tracker</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="  w-full">
          <ResponsiveContainer>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 12, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />

              <ChartTooltip
                content={<ChartTooltipContent hideLabel />}
                cursor={false}
              />

              {Object.keys(chartConfig).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={chartConfig[key].color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig[key].color }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium">
          Tracking time between resets <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Each line = one user’s timer history (different colors).
        </div>
      </CardFooter>
    </Card>
  );
}
