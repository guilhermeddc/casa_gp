"use client";

import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #010409, #0D1117)", // Gradiente refinado
        gap: 2,
        color: "#fff",
      }}
    >
      {/* Logo da Universidade */}
      <div className="flex justify-center w-full text-4xl font-bold">
        Casa DoJoB
      </div>

      {/* Texto de Carregamento */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          letterSpacing: 1.2,
          textAlign: "center",
          mb: 2,
        }}
      >
        Carregando, por favor, aguarde...
      </Typography>

      {/* Circular Progress com Personalização */}
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: "#fff",
        }}
      />

      {/* Estilo do Efeito Bounce */}
      <style jsx global>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </Box>
  );
};
