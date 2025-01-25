import React from "react";
import { AccountToggle, Plan, RouteSelect } from "./components";
import { FiX } from "react-icons/fi";
import { Box } from "@mui/material";

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <Box>
      <div className="overflow-y-hidden sticky top-4 h-[calc(100vh-32px-48px)] px-4 md:px-0">
        <div className="flex items-center justify-between pb-4 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-stone-700 focus:outline-none"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <AccountToggle />
        <RouteSelect />
      </div>

      <Plan />
    </Box>
  );
};
