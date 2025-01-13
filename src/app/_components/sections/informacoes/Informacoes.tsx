import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export const Informacoes: React.FC = () => {
  return (
    <Box id="informacoes">
      <Container>
        <Box
          my={4}
          sx={{
            height: 20,
            borderTop: "4px solid",
            borderColor: "secondary.main",
            borderRadius: "18px",
          }}
        />

        <Typography
          variant="h4"
          align="center"
          sx={{ pb: 2, fontWeight: 600, textTransform: "uppercase" }}
        >
          Bem-vindo à Casa DoJoB
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          “A casa “ DoJoB “ surgi com o propósito de ser um refúgio para homens
          que desejam escapar do estresse e pressão da rotina diária. Com uma
          seleção cuidadosa de sedutoras acompanhantes profissionais dedicadas
          ao seu prazer. Aqui seu desejo é nossa prioridade “
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 6, textAlign: "center" }}>
          * Não somos uma casa noturna , trabalhamos com agendamento e sigilo
          total.
        </Typography>

        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                pb: 1,
                mx: { xs: 12, sm: 3, md: 4 },
                mb: 1,
                borderBottom: "1px solid",
                borderColor: "secondary.main",
              }}
            >
              Atendimento
            </Typography>

            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Em nosso local</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Em hotéis</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Em motéis</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Em seu domicílio</strong>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                pb: 1,
                mx: { xs: 12, sm: 3, md: 4 },
                mb: 1,
                borderBottom: "1px solid",
                borderColor: "secondary.main",
              }}
            >
              Valores
            </Typography>

            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>30 minutos:</strong> R$ 100,00
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>1 hora:</strong> R$ 200,00
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>2 horas:</strong> R$ 300,00
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Pernoite:</strong> R$ 1200,00
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                pb: 1,
                mx: { xs: 12, sm: 3, md: 4 },
                mb: 1,
                borderBottom: "1px solid",
                borderColor: "secondary.main",
              }}
            >
              Pagamento
            </Typography>

            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Dinheiro:</strong> Aceitamos todas as notas.
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Cartão:</strong> Visa, Mastercard e Elo.
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Pix:</strong> Chave aleatória.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                pb: 1,
                mx: { xs: 12, sm: 3, md: 4 },
                mb: 1,
                borderBottom: "1px solid",
                borderColor: "secondary.main",
              }}
            >
              Horário
            </Typography>

            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Segunda a sábado:</strong> 18h às 4h
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Domingo:</strong> 18h às 2h
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Feriados:</strong> 18h às 4h
            </Typography>
          </Grid>
        </Grid>

        <Box
          mt={4}
          sx={{
            height: 20,
            borderBottom: "4px solid",
            borderColor: "secondary.main",
            borderRadius: "18px",
          }}
        />
      </Container>
    </Box>
  );
};
