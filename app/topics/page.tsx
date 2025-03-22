"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, Copy, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Seminar {
  id: string;
  topic: string;
  category: string;
  theory: string;
}

const seminarTopics: Seminar[] = [
  { id: "1", topic: "AI in Healthcare", category: "AI/ML", theory: "AI is transforming medical diagnosis and treatment..." },
  { id: "2", topic: "Machine Learning in Finance", category: "AI/ML", theory: "ML algorithms help in fraud detection and stock predictions..." },
  { id: "3", topic: "DevOps: Continuous Integration & Deployment", category: "DevOps", theory: "CI/CD streamlines software releases and improves efficiency..." },
  { id: "4", topic: "MLOps: Integrating ML into DevOps", category: "DevOps", theory: "MLOps helps in deploying and maintaining ML models in production..." },
  { id: "5", topic: "Ethical AI: Challenges & Solutions", category: "AI/ML", theory: "Ensuring AI fairness, transparency, and accountability..." },
  { id: "6", topic: "Serverless Computing in DevOps", category: "DevOps", theory: "Reduces infrastructure costs and enhances scalability..." },
  { id: "7", topic: "Blockchain for Secure Transactions", category: "Technology", theory: "Decentralized, immutable ledgers improve financial security..." },
  { id: "8", topic: "Cybersecurity in AI", category: "Security", theory: "AI-powered security solutions for cyber threats..." },
  { id: "9", topic: "Explainable AI (XAI)", category: "AI/ML", theory: "Improving AI interpretability and trustworthiness..." },
  { id: "10", topic: "Edge AI: AI at the Edge", category: "AI/ML", theory: "Processing AI locally on devices for real-time applications..." },
];

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const predefinedCategories = ["AI/ML", "DevOps", "Technology", "Security"];

  const filteredTopics = seminarTopics.filter(
    (seminar) =>
      seminar.topic.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || seminar.category === selectedCategory)
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Topic copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        
        {/* Footer at the Top */}
        <p className="text-sm text-muted-foreground text-center mb-4">
          Developed by Om Prakash
        </p>

        {/* Page Title */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <BookOpen className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">Seminar Topics</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Browse and explore a wide range of seminar topics.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="border rounded-md p-2 bg-background"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {predefinedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Seminar Topics List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((seminar) => (
              <Card key={seminar.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{seminar.topic}</CardTitle>
                    <button onClick={() => copyToClipboard(seminar.topic)} className="p-2">
                      <Copy className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="font-medium">{seminar.category}</span>
                    </div>

                    {/* Theory Accordion */}
                    <div>
                      <button
                        onClick={() =>
                          setOpenAccordion(openAccordion === seminar.id ? null : seminar.id)
                        }
                        className="flex items-center text-primary mt-2"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openAccordion === seminar.id ? "rotate-180" : ""
                          }`}
                        />
                        <span className="ml-2">View Theory</span>
                      </button>
                      {openAccordion === seminar.id && (
                        <p className="mt-2 p-2 bg-muted rounded-md text-sm">{seminar.theory}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-3">No seminar topics found</p>
          )}
        </div>
      </div>
    </div>
  );
}
