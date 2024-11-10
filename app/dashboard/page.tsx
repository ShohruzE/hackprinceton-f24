import React from 'react'
import { Bell, ChevronDown, Mic, Settings, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from '@/components/DashboardHeader'

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Nurse Dashboard
            </h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-500" />
              </Button>
              <Avatar className="ml-4">
                <AvatarImage src="/placeholder-user.jpg" alt="Nurse" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium text-gray-700">
                Jane Doe, RN
              </span>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Patients for Today */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patients for Today
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  {[1, 2, 3, 4, 5].map((patient) => (
                    <div
                      key={patient}
                      className="flex items-center justify-between py-4 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>P{patient}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            Patient {patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            Room {100 + patient}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={patient % 2 === 0 ? "default" : "secondary"}
                      >
                        {patient % 2 === 0 ? "Stable" : "Needs Attention"}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  {[1, 2, 3, 4, 5].map((task) => (
                    <div
                      key={task}
                      className="flex items-center mb-4 last:mb-0"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="text-sm font-medium">Task {task}</p>
                        <p className="text-xs text-gray-500">
                          Due in {task} hour(s)
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Recent Notes */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Notes</TabsTrigger>
                    <TabsTrigger value="patient">Patient Notes</TabsTrigger>
                    <TabsTrigger value="personal">Personal Notes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <ScrollArea className="h-[200px] w-full mt-4">
                      {[1, 2, 3, 4, 5].map((note) => (
                        <div key={note} className="mb-4 last:mb-0">
                          <p className="text-sm font-medium">Note {note}</p>
                          <p className="text-xs text-gray-500">
                            {new Date().toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-sm mt-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="patient">
                    <p className="text-sm text-gray-500">
                      Patient-specific notes will be displayed here.
                    </p>
                  </TabsContent>
                  <TabsContent value="personal">
                    <p className="text-sm text-gray-500">
                      Personal notes will be displayed here.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button className="w-full">Add New Patient</Button>
                <Button className="w-full" variant="outline">
                  Create Task
                </Button>
                <Button className="w-full" variant="secondary">
                  Write Note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
