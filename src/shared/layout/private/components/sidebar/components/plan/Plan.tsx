import Link from "next/link";
import React from "react";

export const Plan: React.FC = () => {
  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-4 md:px-2 border-stone-300 justify-end text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">Casa DoJob</p>
          <p className="text-stone-500">
            Criado por:{" "}
            <Link href="https://guilhermeddc.com.br">Guilherme Rodrigues</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
