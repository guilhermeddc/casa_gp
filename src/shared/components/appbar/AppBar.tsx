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

export default function ResponsiveAppBar() {
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
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: 600,
          }}
        >
          Casa Luxuosa Elegance
        </Typography>

        {/* Menu para telas maiores */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link
            href="#inicio"
            color="inherit"
            underline="none"
            sx={{ mx: 2, fontSize: "1rem", fontWeight: 500 }}
          >
            Início
          </Link>
          <Link
            href="#acompanhantes"
            color="inherit"
            underline="none"
            sx={{ mx: 2, fontSize: "1rem", fontWeight: 500 }}
          >
            Acompanhantes
          </Link>
          <Link
            href="#valores"
            color="inherit"
            underline="none"
            sx={{ mx: 2, fontSize: "1rem", fontWeight: 500 }}
          >
            Valores
          </Link>
          <Link
            href="#contato"
            color="inherit"
            underline="none"
            sx={{ mx: 2, fontSize: "1rem", fontWeight: 500 }}
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
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="#inicio" color="primary" underline="none">
                Início
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="#acompanhantes" color="primary" underline="none">
                Acompanhantes
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="#valores" color="primary" underline="none">
                Valores
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="#contato" color="primary" underline="none">
                Contato
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
