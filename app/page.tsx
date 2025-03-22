"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    student1: "",
    student2: "",
  });

  interface Seminar {
    topic: string;
    category: string;
    student1: string;
    student2?: string;
  }

  const [seminars, setSeminars] = useState<Seminar[]>([]); // Stores fetched seminar topics
  const [loading, setLoading] = useState(false);

  // ✅ Fetch seminars from the backend on component mount
  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/seminarApi");
      const data = await response.json();

      if (response.ok) {
        setSeminars(data.data); // Store seminar topics
      } else {
        toast.error("Failed to fetch seminars!");
      }
    } catch (error) {
      console.error("Error fetching seminars:", error);
      toast.error("Something went wrong while fetching seminars!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle seminar submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.topic || !formData.category || !formData.student1) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/seminarApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Seminar topic submitted successfully!");
        setFormData({ topic: "", category: "", student1: "", student2: "" });
        fetchSeminars(); // Refresh seminar list after adding new topic
      } else {
        toast.error(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting seminar:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <p className="text-sm text-muted-foreground text-center mb-4">
          Developed by Om Prakash
        </p>
          <GraduationCap className="h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Student Seminar Portal</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Submit your seminar topic and team members. Collaborate and learn together.
          </p>
        </div>

        {/* Seminar Submission Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit Seminar Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Seminar Topic*</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Enter your seminar topic"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Technology, Science, Business"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student1">Team Leader*</Label>
                <Input
                  id="student1"
                  value={formData.student1}
                  onChange={(e) => setFormData({ ...formData, student1: e.target.value })}
                  placeholder="Enter team leader's name"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student2">Team Member (Optional)</Label>
                <Input
                  id="student2"
                  value={formData.student2}
                  onChange={(e) => setFormData({ ...formData, student2: e.target.value })}
                  placeholder="Enter team member's name"
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Topic
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Seminar List Section */}
        {/* <div className="mt-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Submitted Seminars</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading seminars...</p>
          ) : seminars.length === 0 ? (
            <p className="text-center text-gray-500">No seminars submitted yet.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border">Topic</th>
                    <th className="p-3 border">Category</th>
                    <th className="p-3 border">Team Leader</th>
                    <th className="p-3 border">Team Member</th>
                  </tr>
                </thead>
                <tbody>
                  {seminars.map((seminar, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 border">{seminar.topic}</td>
                      <td className="p-3 border">{seminar.category}</td>
                      <td className="p-3 border">{seminar.student1}</td>
                      <td className="p-3 border">{seminar.student2 || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div> */}
      </div>
    </main>
  );
}
