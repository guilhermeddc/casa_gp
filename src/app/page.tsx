import { Box } from "@mui/material";
import {
  Acompanhantes,
  BoasVindas,
  Informacoes,
  Local,
} from "./_components/sections";

export default function Home() {
  return (
    <Box sx={{ color: "text.primary" }}>
      <BoasVindas />
      <Informacoes />
      <Local />
      <Acompanhantes />
    </Box>
  );
}
