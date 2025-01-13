"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const acompanhantes = [
  { id: "1", name: "Lorena", photoUrl: "/images/image1.png" },
  { id: "2", name: "Naty", photoUrl: "/images/image2.png" },
  { id: "3", name: "Ágatha", photoUrl: "/images/image3.png" },
];

export const BoasVindas: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(), Fade()]);

  return (
    <section className="embla">
      <Box className="embla__viewport" ref={emblaRef}>
        <Box className="embla__container">
          {acompanhantes.map((acompanhante) => (
            <Box
              key={acompanhante.id}
              className="embla__slide"
              p={{ xs: 4, sm: 6 }}
              sx={{
                backgroundImage: `url(${acompanhante.photoUrl})`,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                height="100%"
                p={{ xs: 0, sm: 12, md: 36 }}
              >
                <Typography
                  component={Link}
                  href={`/santa-maria-rs/${acompanhante.name}`}
                  variant="h2"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(0, 0, 0, 0.2)",
                    padding: 1,
                    borderRadius: "8px",
                    fontWeight: 600,
                    boxShadow: 24,
                    fontSize: { xs: "4rem", sm: "2rem", md: "4rem" },
                    transition: "0.3s",
                    hover: {
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  {acompanhante.name}
                </Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  href="#acompanhantes"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.2rem" },
                    borderRadius: "8px",
                  }}
                >
                  Conheça Nossas Acompanhantes
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};
