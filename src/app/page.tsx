"use client";

import { Box, Typography, Button, Grid, Card, Container } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

interface Girl {
  id: string;
  name: string;
  photoUrl: string;
}

export default function Home() {
  const girls: Girl[] = [
    { id: "1", name: "Garota 1", photoUrl: "/images/image1.png" },
    { id: "2", name: "Garota 2", photoUrl: "/images/image2.png" },
  ];

  return (
    <Box sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
      {/* Hero Banner */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "url(/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Bem-vindo à Casa Luxuosa Elegance
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
          >
            Um espaço de requinte e privacidade para momentos inesquecíveis.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="#sobre"
            sx={{ px: 4, py: 1.5, fontSize: "1.2rem", borderRadius: "8px" }}
          >
            Saiba Mais
          </Button>
        </motion.div>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: index === 0 ? "secondary.main" : "white",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Sobre a Casa */}
      <Container id="sobre" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
        >
          Sobre a Casa
        </Typography>
        <Grid container spacing={6}>
          {[
            {
              title: "Ambiente Exclusivo",
              description:
                "Decoração luxuosa, espaços climatizados e aromatizados para oferecer uma experiência sensorial única.",
            },
            {
              title: "Instalações Premium",
              description:
                "Suítes temáticas com iluminação ajustável, banheiras de hidromassagem e som ambiente.",
            },
            {
              title: "Equipe Especializada",
              description:
                "Atendimento multilíngue, profissionalismo e discrição garantidos.",
            },
            {
              title: "Extras e Mimos",
              description:
                "Welcome drink, programa de fidelidade e transporte privativo para clientes VIP.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    p: 4,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Galeria */}
      <Box id="galeria" sx={{ py: 8, backgroundColor: "primary.light" }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
          >
            Nossas Garotas
          </Typography>
          <Grid container spacing={4}>
            {girls.map((girl) => (
              <Grid item xs={12} sm={6} md={4} key={girl.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor: "secondary.main",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={girl.photoUrl}
                      alt={girl.name}
                      width={600}
                      height={800}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">{girl.name}</Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2, textTransform: "none" }}
                      >
                        Ver Perfil
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contato */}
      <Box
        sx={{
          py: 6,
          backgroundColor: "secondary.main",
          color: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Contato
        </Typography>
        <Typography>
          Endereço: Rua das Orquídeas, 987, Centro, Gramado - RS
          <br />
          Telefone: (55) 1234-5678
          <br />
          Horário de Funcionamento: 18h - 04h
        </Typography>
      </Box>
    </Box>
  );
}
