"use client";

import React, { useEffect, useState } from "react";

export const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("pt-BR", { hour12: false }));

      // Atualiza a saudação com base no horário
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Bom dia");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Boa tarde");
      } else {
        setGreeting("Boa noite");
      }
    };

    updateClock(); // Atualiza imediatamente
    const intervalId = setInterval(updateClock, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Informações do usuário */}
        <div>
          <span className="text-md font-bold block">{greeting}, Admin</span>
        </div>

        {/* Relógio no canto direito */}
        <div>
          <span className="text-sm font-bold">
            {new Date().toLocaleDateString("pt-BR")} {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
};
