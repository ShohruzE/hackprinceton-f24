import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const conversations = [
  {
    id: "CONV001",
    patientName: "John Doe",
    summary: "Discussed medication side effects and adjusted dosage.",
    nurseConfirmed: true,
  },
  {
    id: "CONV002",
    patientName: "Jane Smith",
    summary: "Reviewed post-surgery care instructions and scheduled follow-up.",
    nurseConfirmed: true,
  },
  {
    id: "CONV003",
    patientName: "Alice Johnson",
    summary: "Addressed concerns about diet and exercise routine.",
    nurseConfirmed: false,
  },
  {
    id: "CONV004",
    patientName: "Bob Williams",
    summary: "Discussed test results and recommended further examination.",
    nurseConfirmed: true,
  },
  {
    id: "CONV005",
    patientName: "Emma Brown",
    summary:
      "Provided information on new treatment options and potential risks.",
    nurseConfirmed: true,
  },
];

export default function PatientConversationTable() {
  return (
    <Table className="bg-white rounded-md">
      <TableCaption>Patient Conversation Summaries</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Patient Name</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead className="w-[150px]">Nurse Confirmed</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conversations.map((conversation) => (
          <TableRow key={conversation.id}>
            <TableCell className="font-medium">
              {conversation.patientName}
            </TableCell>
            <TableCell>{conversation.summary}</TableCell>
            <TableCell>{conversation.nurseConfirmed ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Link href={`/dashboard/conversations/${conversation.id}`}>
                <Button variant="outline" size="sm" className="w-full">
                  View History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Conversations</TableCell>
          <TableCell>{conversations.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
