"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Seminar {
  _id: string;
  topic: string;
  category: string;
  student1: string;
  student2?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // ✅ Ensure correct URL
      const response = await fetch(`${apiUrl}/api/get`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch seminars");
      }
  
      const data = await response.json();
      console.log("✅ Fetched Data:", data);
  
      if (Array.isArray(data.data)) {
        setStudents(data.data);
      } else {
        console.error("❌ Unexpected data format:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching seminars:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <Users className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">Student Teams</h1>
          <p className="text-muted-foreground max-w-[600px]">
            View all registered teams and their chosen seminar topics.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-muted-foreground py-4">Loading students...</p>
        ) : (
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Leader</TableHead>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell className="font-medium">{student.student1}</TableCell>
                        <TableCell>{student.student2 || "-"}</TableCell>
                        <TableCell>{student.topic}</TableCell>
                        <TableCell>{student.category}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No students found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
