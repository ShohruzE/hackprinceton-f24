"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy data for patients
const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 35,
    dateOfBirth: "1988-05-15",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    dateOfBirth: "1995-09-22",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    age: 42,
    dateOfBirth: "1981-03-10",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Brown",
    age: 31,
    dateOfBirth: "1992-11-07",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Wilson",
    age: 55,
    dateOfBirth: "1968-07-30",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.firstName}</TableCell>
                  <TableCell>{patient.lastName}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/patients/${patient.id}`} passHref>
                      <Button variant="outline" size="sm">
                        See More
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
