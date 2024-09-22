"use client";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import MainHeader from "../components/layout/header/MainHeader";
import React from "react";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "../context/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <MainHeader />
          {children}
          <ToastContainer position={"bottom-center"} />
        </UserProvider>
      </body>
    </html>
  );
}
