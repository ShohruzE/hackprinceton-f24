"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DashboardHeader from '@/components/DashboardHeader'

export default function PatientsPage() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<
    {
      id: string;
      first_name: string;
      last_name: string;
      age: number;
      date_of_birth: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/nurses?nurse_id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPatients(data.patients);
    };
    fetchData();
  }, []);

  console.log("patients", patients);

  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Your Patients</CardTitle>
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
          <Table className="bg-white">
            <TableCaption>Patient Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date of Birth (YY-MM-DD)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key="nurse_id=DSShJZjkxnV53tZeTlOAsfY3jJq2">
                  <TableCell>
                    <Link href={`/dashboard/patients/${patient.id}`}>
                      {patient.first_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/patients/${patient.id}`}>
                      {patient.last_name}
                    </Link>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.date_of_birth}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/patients/${patient.id}`} passHref>
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
