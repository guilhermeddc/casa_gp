"use client";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const ResponsiveAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.dark" }}>
      <Toolbar>
        {/* Logo ou Título */}
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Casa DoJoB
        </Typography>

        {/* Menu para telas maiores */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link
            href="/#inicio"
            color="inherit"
            underline="none"
            sx={{
              mx: 2,
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Início
          </Link>
          <Link
            href="/#acompanhantes"
            color="inherit"
            underline="none"
            sx={{
              mx: 2,
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Acompanhantes
          </Link>
          <Link
            href="/#valores"
            color="inherit"
            underline="none"
            sx={{
              mx: 2,
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Valores
          </Link>
          <Link
            href="/#contato"
            color="inherit"
            underline="none"
            sx={{
              mx: 2,
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Contato
          </Link>
        </Box>

        {/* Menu responsivo (hambúrguer) para telas menores */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon
              sx={{
                color: "text.primary",
              }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{
              display: { xs: "block", sm: "none" },
              color: "text.primary",
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/#inicio" underline="none" color="inherit">
                Início
              </Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Link href="/#acompanhantes" underline="none" color="inherit">
                Acompanhantes
              </Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Link href="/#informacoes" underline="none" color="inherit">
                Informações
              </Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Link href="/#contato" underline="none" color="inherit">
                Contato
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
