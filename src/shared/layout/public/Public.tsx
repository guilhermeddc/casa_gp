import { Box, Container, Typography } from "@mui/material";
import { CreditCard, CurrencyExchange, Pix } from "@mui/icons-material";
import Link from "next/link";
import { FloatButton, ResponsiveAppBar } from "./components";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Cabeçalho */}
      <ResponsiveAppBar />

      {children}

      {/* Formas de pagamento */}

      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
        >
          Formas de pagamento
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Box display="flex" alignItems="center">
            <Pix fontSize="large" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                ml: 2,
                fontSize: { xs: 24, sm: 20 },
              }}
            >
              Pix
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <CreditCard fontSize="large" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                ml: 2,
                fontSize: { xs: 24, sm: 20 },
              }}
            >
              Cartão de Crédito e Débito
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <CurrencyExchange fontSize="large" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                ml: 2,
                fontSize: { xs: 24, sm: 20 },
              }}
            >
              Dinheiro
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Contato */}
      <Box bgcolor="secondary.main" boxShadow={24}>
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
              <strong>Endereço:</strong> Rua das Orquídeas, 987, Santa Maria -
              RS
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Rodapé */}
      <Box
        boxShadow={24}
        sx={{
          py: 6,
          backgroundColor: "secondary.dark",
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

      <FloatButton />
    </>
  );
}
