import { AcUnit, Garage, Lock, Shield, ThumbUpAlt } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

export const Local: React.FC = () => {
  return (
    <Box py={6} bgcolor="secondary.main" mt={6} borderRadius={2}>
      <Container>
        <Box
          display="flex"
          alignItems="flex-start"
          gap={2}
          justifyContent="space-between"
          alignContent="center"
          flexWrap="wrap"
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box display="flex" alignItems="center">
            <Garage fontSize="large" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, ml: 2, fontSize: { xs: 24, sm: 20 } }}
            >
              Estacionamento
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <AcUnit fontSize="large" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, ml: 2, fontSize: { xs: 24, sm: 20 } }}
            >
              Climatizado
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Shield fontSize="large" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, ml: 2, fontSize: { xs: 24, sm: 20 } }}
            >
              Privacidade
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <ThumbUpAlt fontSize="large" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, ml: 2, fontSize: { xs: 24, sm: 20 } }}
            >
              Tranquilidade
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Lock fontSize="large" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, ml: 2, fontSize: { xs: 24, sm: 20 } }}
            >
              Segurança
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
