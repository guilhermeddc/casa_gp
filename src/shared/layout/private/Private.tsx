"use client";

import { useState } from "react";
import { Sidebar } from "./components";
import { Box } from "@mui/material";
import { LoadingScreen } from "../../components";
import { useAccessControl } from "../../hooks";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading } = useAccessControl({ currentArea: "admin" });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box
        component="main"
        bgcolor="background.default"
        className="flex flex-col min-h-screen md:hidden"
      >
        <header className="p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-bold">Casa DoJob</h1>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-stone-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <div className="flex flex-1">
          <Box
            bgcolor="background.paper"
            component="aside"
            className={`fixed inset-y-0 left-0 z-30 w-[70%] overflow-y-auto transition duration-300 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:static md:inset-0`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </Box>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </div>

        <Box
          bgcolor="background.paper"
          className="rounded-lg pb-4 m-2 shadow min-h-[calc(100vh-32px-48px)]"
        >
          {children}
        </Box>
      </Box>

      <Box
        component="main"
        bgcolor="background.default"
        className="gap-4 p-4 grid-cols-[220px,_1fr] hidden md:grid"
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />

        <Box
          bgcolor="background.paper"
          className="rounded-lg pb-4 shadow min-h-[calc(100vh-32px-48px)]"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
