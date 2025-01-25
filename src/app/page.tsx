import { Box } from "@mui/material";
import {
  Acompanhantes,
  BoasVindas,
  Informacoes,
  Local,
} from "./_components/sections";
import { profileService } from "@/shared/services";
import PublicLayout from "@/shared/layout/public/Public";

export default async function Home() {
  const acompanhantes = await profileService.index();

  return (
    <PublicLayout>
      <Box sx={{ color: "text.primary" }}>
        <BoasVindas acompanhantes={acompanhantes} />
        <Informacoes />
        <Local />
        <Acompanhantes acompanhantes={acompanhantes} />
      </Box>
    </PublicLayout>
  );
}
