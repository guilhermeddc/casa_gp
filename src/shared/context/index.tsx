"use client";

import * as React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "./createEmotionCache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR as pickersPtBR } from "@mui/x-date-pickers/locales";
import theme from "../styles/theme";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState<EmotionCache>(() => createEmotionCache());

  const queryClient = new QueryClient();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={
        pickersPtBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {/* <CacheProvider value={cache}> */}
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
      {/* </CacheProvider> */}
    </LocalizationProvider>
  );
}
