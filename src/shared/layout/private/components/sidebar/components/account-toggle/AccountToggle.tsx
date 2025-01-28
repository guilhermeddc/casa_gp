import React from "react";
import { FaUserNinja } from "react-icons/fa";

export const AccountToggle: React.FC = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-800 rounded transition-colors relative gap-2 w-full items-center">
        <FaUserNinja className="size-8 rounded shrink-0 bg-red-800 text-white shadow p-0.5" />

        <div className="text-start">
          <span className="text-sm font-semibold block">admin</span>

          <span className="text-xs block text-stone-500">Administrador</span>
        </div>
      </button>
    </div>
  );
};
