import { Box } from "@mui/material";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
