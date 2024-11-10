import React from "react";
import { Bell, ChevronDown, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function individualPatient() {
  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Patient Dashboard
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
                Jane Doe
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Patient Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>John Smith - Room 302</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Age</Label>
                  <Input value="45" readOnly />
                </div>
                <div>
                  <Label>Blood Type</Label>
                  <Input value="A+" readOnly />
                </div>
                <div>
                  <Label>Allergies</Label>
                  <Input value="Penicillin" readOnly />
                </div>
                <div>
                  <Label>Primary Condition</Label>
                  <Input value="Hypertension" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Latest Conversation Summary</CardTitle>
              <CardDescription>
                Recorded on May 15, 2023 at 2:30 PM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Patient reported feeling better today. Mentioned slight
                discomfort in lower back. Discussed medication side effects and
                adjusted dosage for pain medication. Patient expressed concern
                about discharge date, reassured and provided estimated timeline.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline">Edit Summary</Button>
                  <Button variant="outline">View Past Conversations</Button>
                </div>
                <Button>
                  <Mic className="mr-2 h-4 w-4" />
                  Start New Recording
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vitals and Notes */}
          <Tabs defaultValue="vitals" className="w-full">
            <TabsList>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="notes">Nurse Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Blood Pressure</Label>
                      <Input value="120/80 mmHg" readOnly />
                    </div>
                    <div>
                      <Label>Heart Rate</Label>
                      <Input value="72 bpm" readOnly />
                    </div>
                    <div>
                      <Label>Temperature</Label>
                      <Input value="98.6°F" readOnly />
                    </div>
                    <div>
                      <Label>Oxygen Saturation</Label>
                      <Input value="98%" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Nurse Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-32 p-2 border rounded-md"
                    placeholder="Enter nurse notes here..."
                  ></textarea>
                  <Button className="mt-2">Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
