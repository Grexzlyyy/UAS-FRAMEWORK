import { useEffect, useState } from 'react';
import axios from '../api/apiclient';
import {
  Container, Typography, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableHead, TableRow, Box
} from '@mui/material';

export default function HomePage() {
  const [penumpang, setPenumpang] = useState([]);
  const [bus, setBus] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [resPenumpang, resBus, resJadwal, resKategori] = await Promise.all([
          axios.get('/penumpang/read.php'),
          axios.get('/bus/read.php'),
          axios.get('/jadwal/read.php'),
          axios.get('/kategori/read.php'),
        ]);
        setPenumpang(resPenumpang.data);
        setBus(resBus.data);
        setJadwal(resJadwal.data);
        setKategori(resKategori.data);
      } catch (err) {
        console.error('Gagal fetch data:', err);
      }
    };
    fetchAll();
  }, []);

  const cardStyle = {
    height: '300px',
    overflow: 'auto',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: 1,
    p: 1,
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Data Tiket Bus
      </Typography>

      <Grid container spacing={3}>
        {/* Penumpang */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={cardStyle}>
              <Typography variant="h6" gutterBottom>Penumpang</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Jadwal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {penumpang.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.nama}</TableCell>
                      <TableCell>{p.jadwal_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Bus */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={cardStyle}>
              <Typography variant="h6" gutterBottom>Bus</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Kapasitas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bus.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>{b.nama_bus}</TableCell>
                      <TableCell>{b.kapasitas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Jadwal */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={cardStyle}>
              <Typography variant="h6" gutterBottom>Jadwal</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Jam</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jadwal.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell>{j.id}</TableCell>
                      <TableCell>{j.tanggal}</TableCell>
                      <TableCell>{j.jam}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Kategori */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={cardStyle}>
              <Typography variant="h6" gutterBottom>Kategori</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama Kategori</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kategori.map((k) => (
                    <TableRow key={k.id}>
                      <TableCell>{k.id}</TableCell>
                      <TableCell>{k.nama_kategori}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
