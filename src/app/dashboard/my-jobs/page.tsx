

"use client"; 

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  Star,
  Eye,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import PageContainer from "@/components/layout/page-container";

// --- TYPES AND MOCK DATA ---

type JobStatus =
  | "IN_PROGRESS"
  | "REVIEWING_PROPOSALS"
  | "COMPLETED"
  | "CANCELED";

interface Job {
  id: string;
  title: string;
  status: JobStatus;
  proposals: number | "Hired" | "N/A";
  dueDate: string;
}

const jobs: Job[] = [
  {
    id: "job1",
    title: "Annual Tax Filing",
    status: "IN_PROGRESS",
    proposals: "Hired",
    dueDate: "Oct 15, 2025",
  },
  {
    id: "job2",
    title: "VAT Return Q3",
    status: "REVIEWING_PROPOSALS",
    proposals: 5,
    dueDate: "Sep 30, 2025",
  },
  {
    id: "job3",
    title: "Company Formation",
    status: "COMPLETED",
    proposals: "N/A",
    dueDate: "Aug 01, 2025",
  },
  {
    id: "job4",
    title: "Old Project",
    status: "CANCELED",
    proposals: 0,
    dueDate: "Jul 15, 2025",
  },
  {
    id: "job5",
    title: "Website UI/UX Redesign",
    status: "REVIEWING_PROPOSALS",
    proposals: 12,
    dueDate: "Nov 01, 2025",
  },
  {
    id: "job6",
    title: "Bookkeeping for Q3",
    status: "COMPLETED",
    proposals: "Hired",
    dueDate: "Sep 20, 2025",
  },
];

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const variant: "default" | "secondary" | "outline" | "destructive" =
    useMemo(() => {
      switch (status) {
        case "IN_PROGRESS":
          return "default";
        case "COMPLETED":
          return "secondary";
        case "REVIEWING_PROPOSALS":
          return "outline";
        case "CANCELED":
          return "destructive";
      }
    }, [status]);

  return <Badge variant={variant}>{status.replace("_", " ")}</Badge>;
};

const ActionButton = ({ status }: { status: JobStatus }) => {
  const commonClasses = "w-full sm:w-auto";
  switch (status) {
    case "IN_PROGRESS":
      return (
        <Button size="sm" className={commonClasses}>
          View Workspace <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    case "REVIEWING_PROPOSALS":
      return (
        <Button size="sm" variant="outline" className={commonClasses}>
          Review Bids <MessageSquare className="ml-2 h-4 w-4" />
        </Button>
      );
    case "COMPLETED":
      return (
        <Button size="sm" variant="secondary" className={commonClasses}>
          View & Rate <Star className="ml-2 h-4 w-4" />
        </Button>
      );
    case "CANCELED":
      return (
        <Button size="sm" variant="ghost" className={commonClasses}>
          View <Eye className="ml-2 h-4 w-4" />
        </Button>
      );
    default:
      return null;
  }
};

// --- MAIN COMPONENT ---

export default function MyJobsPage() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesTab = activeTab === "ALL" || job.status === activeTab;
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <PageContainer>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      
      
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Job Requests</CardTitle>
            <CardDescription>
              Manage your job posts and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* --- FILTERS & SEARCH --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 sm:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for jobs..."
                  className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
               <Tabs
                defaultValue="ALL"
                onValueChange={setActiveTab}
                className="overflow-x-auto"
              >
                <TabsList>
                  <TabsTrigger value="ALL">All</TabsTrigger>
                  <TabsTrigger value="REVIEWING_PROPOSALS">Open</TabsTrigger>
                  <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
                  <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
                  <TabsTrigger value="CANCELED">Canceled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* --- DESKTOP TABLE VIEW --- */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Job Title & Status</TableHead>
                    <TableHead>Proposals</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="font-medium">{job.title}</div>
                          <StatusBadge status={job.status} />
                        </TableCell>
                        <TableCell>{job.proposals}</TableCell>
                        <TableCell>{job.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <ActionButton status={job.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        No jobs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* --- MOBILE CARD VIEW --- */}
            <div className="grid gap-4 md:hidden">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                         <CardTitle className="text-base font-semibold leading-tight">{job.title}</CardTitle>
                         <StatusBadge status={job.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex justify-between text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium">Proposals</div>
                        <div>{job.proposals}</div>
                      </div>
                      <div>
                        <div className="font-medium">Due Date</div>
                        <div>{job.dueDate}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <ActionButton status={job.status} />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  No jobs found.
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
             {/* --- PAGINATION --- */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </main>
    </div>
    </PageContainer>
  );
}