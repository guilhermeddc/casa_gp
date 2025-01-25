import React from "react";
import { FiHome } from "react-icons/fi";
import { Route } from "../route/Route";

export const RouteSelect: React.FC = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} title="Dashboard" path="/admin" />
    </div>
  );
};
