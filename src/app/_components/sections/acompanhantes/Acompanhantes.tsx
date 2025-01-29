"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Profile } from "../../../../shared/types";

interface IProps {
  acompanhantes: Profile[];
}

export const Acompanhantes: React.FC<IProps> = ({ acompanhantes }) => {
  const router = useRouter();

  return (
    <Container id="acompanhantes" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        Nossas Acompanhantes
      </Typography>

      <Grid container spacing={4}>
        {acompanhantes.map((acompanhante) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={acompanhante.id}
            onClick={() => router.push(`/santa-maria-rs/${acompanhante.slug}`)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{ cursor: "pointer" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: "133%", // Proporção 3:4
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "4px solid",
                  borderColor: "secondary.main",
                  backgroundColor: "primary.light",
                }}
              >
                <Image
                  src={acompanhante.image}
                  alt={acompanhante.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {acompanhante.name}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
