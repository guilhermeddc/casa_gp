import { useAccessControl } from "@/shared/hooks";
import { LoadingScreen } from "@/shared/components";
import { Box } from "@mui/material";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAccessControl({ currentArea: "admin" });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #010409, #0D1117)",
      }}
    >
      {children}
    </Box>
  );
}
