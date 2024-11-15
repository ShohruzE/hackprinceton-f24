"use client";

import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, ClipboardList, User } from "lucide-react";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import RecordingForm from "@/components/RecordingForm";

export default function DashboardHomePage() {
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.displayName as string;
        const initials = userName.slice(0, 2).toUpperCase();
        setUsername(userName);
        setPfp(initials);
      }
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
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
                {/* <Button className="w-full">Add New Patient</Button> */}
                <RecordingForm />
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
