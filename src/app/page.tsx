"use client";

import { Box, Typography, Button, Grid, Container, Link } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ResponsiveAppBar from "@/shared/components/appbar/AppBar";

export default function Home() {
  const router = useRouter();

  const acompanhantes = [
    { id: "1", name: "Lorena", photoUrl: "/images/image1.png" },
    { id: "2", name: "Naty", photoUrl: "/images/image2.png" },
    { id: "3", name: "Ágatha", photoUrl: "/images/image3.png" },
  ];

  return (
    <Box sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
      {/* Cabeçalho */}
      <ResponsiveAppBar />
      {/* Seção de Boas-Vindas */}
      <Box
        id="inicio"
        sx={{
          height: { xs: "60vh", sm: "80vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "url(/images/banner2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: { xs: 4, sm: 6 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Bem-vindo à Casa Luxuosa Elegance
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            Um espaço de requinte e privacidade para momentos inesquecíveis.
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
        </motion.div>
      </Box>
      {/* Seção de Acompanhantes */}
      <Container id="acompanhantes" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
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
              onClick={() => router.push(`/santa-maria-rs/${acompanhante.id}`)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    paddingBottom: "133%", // Proporção 3:4
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "secondary.main",
                    backgroundColor: "primary.light",
                  }}
                >
                  <Image
                    src={acompanhante.photoUrl}
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
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  {acompanhante.name}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Seção de Valores */}
      <Box id="valores" sx={{ py: 8, backgroundColor: "primary.light" }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
          >
            Nossos Valores
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { service: "30 Minutos", price: "R$ 150" },
              { service: "1 Hora", price: "R$ 250" },
              { service: "2 Horas", price: "R$ 450" },
              { service: "Pernoite", price: "R$ 1.200" },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      border: "1px solid",
                      borderColor: "secondary.main",
                      borderRadius: "8px",
                      backgroundColor: "primary.light",
                      color: "text.primary",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {value.service}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {value.price}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Seção de Contato */}
      <Container id="contato" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
        >
          Informações e Reserva
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Telefone:</strong> (55) 99999-9999
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>WhatsApp:</strong>{" "}
            <Link
              href="https://wa.me/559999999999"
              target="_blank"
              rel="noopener"
              color="secondary"
            >
              Clique aqui para conversar
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Horário de Funcionamento:</strong> 18h às 4h
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Endereço:</strong> Rua das Orquídeas, 987, Santa Maria - RS
          </Typography>
        </Box>
      </Container>
      {/* Rodapé */}
      <Box
        sx={{
          py: 6,
          backgroundColor: "primary.dark",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Este site contém conteúdo adulto. A entrada é permitida apenas para
          maiores de 18 anos.
        </Typography>
        <Typography variant="body2">
          © 2024 Casa Luxuosa Elegance - Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
