"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Box } from "@mui/material";

interface IRoute {
  Icon?: IconType;
  title: string;
  path?: string;
  routes?: IRoute[];
}

export const Route: React.FC<IRoute> = ({ Icon, title, path, routes }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedRoute = pathname.includes(path || `/${title.toLowerCase()}`);

  const handleClick = () => {
    if (routes && routes.length > 0) {
      setIsOpen(!isOpen);
    } else {
      router.push(path || `/${title.toLowerCase()}`);
    }
  };

  return (
    <div className="w-full">
      <Box
        component="button"
        color={selectedRoute ? "text.primary" : "text.stone-500"}
        onClick={handleClick}
        bgcolor={selectedRoute ? "background.paper" : "background.default"}
        className={`flex items-center justify-between gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selectedRoute
            ? "text-stone-50 shadow"
            : "bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <span>{title}</span>
        </div>

        {routes && routes.length > 0 && (
          <div>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</div>
        )}
      </Box>

      {isOpen && routes && (
        <div className="ml-4 mt-1">
          {routes.map((route) => (
            <Route
              key={route.title}
              Icon={route.Icon}
              title={route.title}
              path={route.path}
              routes={route.routes}
            />
          ))}
        </div>
      )}
    </div>
  );
};
