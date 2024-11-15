"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col items-start justify-start">
          <Navbar />
          <div className="p-5">{children}</div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
