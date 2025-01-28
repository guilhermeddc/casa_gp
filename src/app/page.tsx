import { Box } from "@mui/material";
import {
  Acompanhantes,
  BoasVindas,
  Informacoes,
  Local,
} from "./_components/sections";
import { Profile } from "../shared/types";
import { profileService } from "../shared/services";
import PublicLayout from "../shared/layout/public/Public";

export default async function Home() {
  let acompanhantes: Profile[] = [];

  try {
    acompanhantes = await profileService.index();
  } catch (error) {
    console.error("Erro ao buscar acompanhantes:", error);
  }

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
