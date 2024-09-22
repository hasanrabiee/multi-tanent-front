"use client";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-100 h-screen">{children}</div>
    </div>
  );
}
