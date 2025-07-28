

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import {
  Briefcase,
  PlusCircle,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  Bell,
  CheckCircle2,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";

// --- MOCK DATA (Replace with your actual API data) ---

const client = {
  companyName: "Innovate Inc.",
  user: {
    name: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=alice",
  },
};

const activeJobs = [
  {
    id: "job1",
    title: "Annual Tax Filing",
    status: "IN PROGRESS",
    provider: "ProviderX",
    dueDate: "Oct 15, 2025",
  },
  {
    id: "job2",
    title: "VAT Return Q3",
    status: "REVIEWING PROPOSALS",
    proposalCount: 5,
    postedDate: "3 days ago",
  },
];

const notifications = [
  {
    id: "notif1",
    type: "PROPOSAL",
    text: 'ProviderY submitted a proposal for "VAT Return Q3"',
    time: "2 hours ago",
  },
  {
    id: "notif2",
    type: "MESSAGE",
    text: 'ProviderX sent a message on "Annual Tax Filing"',
    time: "5 hours ago",
  },
  {
    id: "notif3",
    type: "ACTION",
    text: "ProviderX has submitted final work for approval.",
    time: "1 day ago",
  },
];

// --- SUB-COMPONENTS  ---

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "PROPOSAL":
      return <Briefcase className="h-5 w-5 text-blue-500" />;
    case "MESSAGE":
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    case "ACTION":
      return <CheckCircle2 className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const UserProfileNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar>
          <AvatarImage src={client.user.avatarUrl} alt={client.user.name} />
          <AvatarFallback>{client.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{client.user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {client.companyName}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


// --- MAIN DASHBOARD COMPONENT ---

export function ClientDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* === Welcome Banner & CTAs === */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight">
             {client.companyName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects today.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-5 w-5" />
              Post a New Job Request
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Buy Now Services
            </Button>
          </div>
        </section>
        
        <Separator />

        {/* === Main Grid Layout === */}
        <div className="grid gap-6 lg:grid-cols-2">
            
          {/* === Active Jobs Overview === */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Active Jobs Overview</CardTitle>
              <CardDescription>
                Track your ongoing projects and proposals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3">
                      <Badge variant={job.status === "IN PROGRESS" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                      <h3 className="font-semibold">{job.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {job.status === "IN PROGRESS"
                        ? `Provider: ${job.provider} | Due: ${job.dueDate}`
                        : `${job.proposalCount} Proposals Received | Posted: ${job.postedDate}`}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {job.status === "IN PROGRESS" ? "View Workspace" : "Review Proposals"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
               <Button variant="link" className="p-0 h-auto text-primary">
                  View All Jobs
              </Button>
            </CardContent>
          </Card>
            
          {/* === Recent Activity & Notifications === */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates on your account and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flow-root">
                    <ul className="-mb-4">
                        {notifications.map((notif, index) => (
                        <li key={notif.id}>
                            <div className="relative pb-4">
                            {index !== notifications.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                                <div>
                                <div className="relative px-1">
                                    <div className="h-8 w-8 bg-background rounded-full ring-4 ring-white flex items-center justify-center">
                                    <NotificationIcon type={notif.type} />
                                    </div>
                                </div>
                                </div>
                                <div className="min-w-0 flex-1 py-1.5">
                                <div className="text-sm text-foreground">
                                    {notif.text}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {notif.time}
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}