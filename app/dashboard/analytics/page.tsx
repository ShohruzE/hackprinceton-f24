"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for vital signs
const mockData = [
  { date: "2023-05-01", bloodPressure: "120/80", heartRate: 72, oxygenSaturation: 98 },
  { date: "2023-05-02", bloodPressure: "118/78", heartRate: 70, oxygenSaturation: 97 },
  { date: "2023-05-03", bloodPressure: "122/82", heartRate: 75, oxygenSaturation: 99 },
  { date: "2023-05-04", bloodPressure: "121/81", heartRate: 73, oxygenSaturation: 98 },
  { date: "2023-05-05", bloodPressure: "119/79", heartRate: 71, oxygenSaturation: 97 },
  { date: "2023-05-06", bloodPressure: "120/80", heartRate: 72, oxygenSaturation: 98 },
  { date: "2023-05-07", bloodPressure: "118/78", heartRate: 70, oxygenSaturation: 99 },
]

export default function PatientVitalsAnalytics({ patientName = "John Doe" }) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  return (
    <Card className="w-full max-w-4xl mx-auto min-h-screen">
      <CardHeader>
        <CardTitle>Vital Signs Analytics for {patientName}</CardTitle>
        <CardDescription>Track changes in patient's vital signs over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Date Range</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Blood Pressure Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                systolic: {
                  label: "Systolic",
                  color: "hsl(var(--chart-1))",
                },
                diastolic: {
                  label: "Diastolic",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey={(data) => parseInt(data.bloodPressure.split('/')[0])}
                    stroke="var(--color-systolic)"
                    name="Systolic"
                  />
                  <Line
                    type="monotone"
                    dataKey={(data) => parseInt(data.bloodPressure.split('/')[1])}
                    stroke="var(--color-diastolic)"
                    name="Diastolic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Heart Rate Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                heartRate: {
                  label: "Heart Rate",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="var(--color-heartRate)"
                    name="Heart Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Oxygen Saturation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Oxygen Saturation</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                oxygenSaturation: {
                  label: "Oxygen Saturation",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="oxygenSaturation"
                    stroke="var(--color-oxygenSaturation)"
                    name="Oxygen Saturation"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
