import { Box, Typography, Grid, Container, Link } from "@mui/material";
import Image from "next/image";
import {
  CheckRounded,
  CloseRounded,
  PlaylistAddCheckRounded,
  PriceCheckRounded,
} from "@mui/icons-material";
import { profileService } from "@/shared/services";
import { notFound } from "next/navigation";
import PublicLayout from "@/shared/layout/public/Public";

export default async function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await profileService.showBySlug(slug);
  if (!data) notFound();

  const profile = {
    services: [
      { name: "Beijo", available: true, note: "Dependendo da higiene" },
      { name: "Anal", available: false },
      { name: "Oral com preservativo", available: true },
      {
        name: "Oral sem preservativo",
        available: true,
        note: "Sob análise na hora",
      },
      { name: "Inversão", available: true, additional: "R$ 50,00" },
      {
        name: "Amigas para atendimento em dupla",
        available: true,
        additional: "R$ 50,00",
      },
      {
        name: "Atende casais com interação feminina",
        available: true,
        additional: "R$ 50,00",
      },
      {
        name: "Atende casais sem interação feminina",
        available: true,
        additional: "R$ 50,00",
      },
    ],
    photos: ["/images/image1.png", "/images/image2.png", "/images/image3.png"],
    contact: {
      phone: "(54) 99639-7480",
      whatsapp: "https://wa.me/5554996397480",
      workingHours: "10:00 às 00:00",
    },
  };

  return (
    <PublicLayout>
      <Box sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
        {/* Seção de Perfil */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Foto em Destaque */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "133%", // Proporção 3:4
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "secondary.main",
                  backgroundColor: "primary.light",
                }}
              >
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>

            {/* Informações Pessoais */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                {data.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Idade:</strong> {data.age} anos
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Altura:</strong> {data.height}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Peso:</strong> {data.weight}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Pés:</strong> {data.feet}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Naturalidade:</strong> {data.naturalness}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Descrição:</strong> {data.description}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Seção de Serviços */}
        <Container sx={{ py: 8 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
          >
            Serviços Oferecidos
          </Typography>
          <Grid container spacing={3}>
            {profile.services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    border: "2px solid",
                    borderColor: "text.primary",
                    borderRadius: "8px",
                    backgroundColor: service.available
                      ? "primary.light"
                      : "secondary.light",
                    color: service.available ? "text.primary" : "grey.500",
                  }}
                >
                  <Box display="flex" gap={1} justifyContent="center">
                    {service.available && service.additional ? (
                      <PriceCheckRounded fontSize="large" />
                    ) : service.available && service.note ? (
                      <PlaylistAddCheckRounded fontSize="large" />
                    ) : service.available ? (
                      <CheckRounded fontSize="large" />
                    ) : (
                      <CloseRounded fontSize="large" />
                    )}

                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        fontWeight: 600,
                        textDecoration: service.available
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Box>

                  {service.note && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <em>{service.note}</em>
                    </Typography>
                  )}

                  {service.additional && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "secondary.main" }}
                    >
                      + {service.additional}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Galeria de Fotos */}
        <Container sx={{ py: 8 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
          >
            Galeria de Fotos
          </Typography>

          <Grid container spacing={4}>
            {profile.photos.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "133%", // Proporção 3:4
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "secondary.main",
                    backgroundColor: "primary.light",
                  }}
                >
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Informações de Contato */}
        <Container sx={{ py: 8 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 6, fontWeight: 600, textTransform: "uppercase" }}
          >
            Informações e Reserva
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Telefone:</strong> {profile.contact.phone}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>WhatsApp:</strong>{" "}
              <Link
                href={profile.contact.whatsapp}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                Clique aqui para conversar
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Horário de Atendimento:</strong>{" "}
              {profile.contact.workingHours}
            </Typography>
          </Box>
        </Container>
      </Box>
    </PublicLayout>
  );
}
