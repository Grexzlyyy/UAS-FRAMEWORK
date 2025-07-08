import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Penumpang', path: '/penumpang' },
    { label: 'Bus', path: '/bus' },
    { label: 'Jadwal', path: '/jadwal' },
    { label: 'Kategori', path: '/kategori' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Aplikasi Tiket Bus
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              sx={{
                mx: 1,
                borderBottom: location.pathname === item.path ? '2px solid white' : 'none'
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
