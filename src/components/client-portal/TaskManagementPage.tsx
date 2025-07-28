// src/components/TaskManagementPage.tsx or src/app/order/[id]/page.tsx

"use client"; // This page is interactive, so it must be a client component

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import {
  Briefcase,
  Check,
  Paperclip,
  Send,
  Download,
  ShieldAlert,
  Info,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import React from "react";

// --- TYPES AND MOCK DATA ---

type OrderStatus = "ACCEPTED" | "IN_PROGRESS" | "SUBMITTED" | "APPROVED" | "COMPLETED";

interface Message {
  id: string;
  sender: "client" | "provider";
  senderName: string;
  avatarUrl: string;
  text?: string;
  file?: { name: string; size: string };
  timestamp: string;
}

const order = {
  id: "order123",
  title: "Annual Tax Filing",
  provider: { name: "ProviderX", avatarUrl: "https://i.pravatar.cc/150?u=providerx" },
  client: { name: "Alice", avatarUrl: "https://i.pravatar.cc/150?u=alice" },
  price: 450,
  dueDate: "Oct 15, 2025",
  status: "SUBMITTED" as OrderStatus,
  description: "Annual tax return preparation and filing for a single-member LLC. All financial statements will be provided.",
  category: "Tax & Accounting",
};

const messages: Message[] = [
  {
    id: "msg1",
    sender: "client",
    senderName: order.client.name,
    avatarUrl: order.client.avatarUrl,
    text: "Hello, just checking in on the status.",
    timestamp: "Oct 5, 2:05 PM",
  },
  {
    id: "msg2",
    sender: "provider",
    senderName: order.provider.name,
    avatarUrl: order.provider.avatarUrl,
    text: "Here is the draft for your review.",
    timestamp: "Oct 5, 2:10 PM",
    file: { name: "draft_return.pdf", size: "1.2 MB" },
  },
  {
    id: "msg3",
    sender: "provider",
    senderName: order.provider.name,
    avatarUrl: order.provider.avatarUrl,
    text: "I've just submitted the final version to the Deliverables tab for your approval.",
    timestamp: "Oct 6, 9:30 AM",
  },
];

const finalDeliverables = [
    { name: "Final_Tax_Return_2024.pdf", size: "1.5 MB", submittedAt: "Oct 6, 9:29 AM" },
    { name: "Filing_Confirmation.png", size: "300 KB", submittedAt: "Oct 6, 9:29 AM" },
];

// --- SUB-COMPONENTS ---

const OrderStatusTracker = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const statuses: OrderStatus[] = ["ACCEPTED", "IN_PROGRESS", "SUBMITTED", "APPROVED", "COMPLETED"];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between">
      {statuses.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isCompleted || isCurrent ? "bg-primary" : "bg-muted border"
                } ${isCompleted || isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <p className={`mt-2 text-xs text-center ${isCurrent ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {status.replace("_", " ")}
              </p>
            </div>
            {index < statuses.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ChatMessage = ({ msg }: { msg: Message }) => {
    const isClient = msg.sender === 'client';
    return (
        <div className={`flex items-start gap-3 ${isClient ? 'justify-end' : ''}`}>
            {!isClient && <Avatar className="h-9 w-9"><AvatarImage src={msg.avatarUrl} /><AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback></Avatar>}
            <div className={`flex flex-col gap-1 ${isClient ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg p-3 text-sm ${isClient ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {msg.text && <p>{msg.text}</p>}
                    {msg.file && (
                        <a href="#" className="flex items-center gap-3 mt-2 bg-background/50 p-2 rounded-md hover:bg-background/80">
                           <Paperclip className="h-5 w-5" />
                           <div>
                                <p className="font-semibold">{msg.file.name}</p>
                                <p className="text-xs">{msg.file.size}</p>
                           </div>
                        </a>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
            </div>
            {isClient && <Avatar className="h-9 w-9"><AvatarImage src={msg.avatarUrl} /><AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback></Avatar>}
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

export default function TaskManagementPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="">Vacei</span>
        </a>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* === MAIN CONTENT (Left Column on Desktop) === */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Order: {order.title}</CardTitle>
                <CardDescription>
                  Provider: {order.provider.name} | Price: ${order.price} (in Escrow) | Due: {order.dueDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderStatusTracker currentStatus={order.status} />
              </CardContent>
            </Card>

            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="messages">Messages & Files</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                <TabsTrigger value="details">Order Details</TabsTrigger>
              </TabsList>

              <TabsContent value="messages">
                <Card>
                  <CardContent className="p-4 space-y-6">
                    <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
                       {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Textarea placeholder="Type your message..." className="flex-1" rows={1} />
                      <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deliverables">
                <Card>
                    <CardHeader>
                       <CardTitle>Final Deliverables</CardTitle>
                       <CardDescription>Files submitted by the provider for your final approval.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       {finalDeliverables.map(file => (
                           <div key={file.name} className="flex items-center justify-between border p-3 rounded-lg">
                              <div>
                                 <p className="font-medium">{file.name}</p>
                                 <p className="text-sm text-muted-foreground">{file.size} - Submitted: {file.submittedAt}</p>
                              </div>
                              <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                           </div>
                       ))}
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                 <Card>
                    <CardHeader><CardTitle>Original Job Request</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <h4 className="font-semibold">Category: {order.category}</h4>
                       <p className="text-sm text-muted-foreground">{order.description}</p>
                    </CardContent>
                 </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* === SIDEBAR (Right Column on Desktop) === */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {order.status === 'SUBMITTED' && (
                    <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Work Submitted!</AlertTitle>
                        <AlertDescription className="mb-4">The provider has submitted the final work. Please review the files in the "Deliverables" tab.</AlertDescription>
                        <div className="flex flex-col gap-3">
                            <Button className="w-full"><Check className="mr-2 h-4 w-4" />Approve & Release Payment</Button>
                            <Button variant="outline" className="w-full"><RefreshCw className="mr-2 h-4 w-4" />Request Revision</Button>
                        </div>
                    </Alert>
                 )}
                 {order.status === 'IN_PROGRESS' && (
                     <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Order In Progress</AlertTitle>
                        <AlertDescription className="text-blue-700">The provider is currently working on your order.</AlertDescription>
                     </Alert>
                 )}
                <Separator />
                <div className="space-y-2">
                    <h4 className="font-semibold">Need Help?</h4>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5">
                      <ShieldAlert className="mr-2 h-4 w-4" /> Flag for Dispute
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}