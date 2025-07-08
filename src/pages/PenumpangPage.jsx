import { useEffect, useState } from 'react';
import axios from '../api/apiclient';
import {
  Container, Typography, TextField, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Grid, MenuItem,
} from '@mui/material';

export default function PenumpangPage() {
  const [data, setData] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    id: '',
    nama: '',
    nik: '',
    hp: '',
    email: '',
    jadwal_id: ''
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('/penumpang/read.php');
      setData(res.data);
    } catch (err) {
      console.error('Gagal ambil data:', err);
    }
  };

  const fetchJadwal = async () => {
    try {
      const res = await axios.get('/jadwal/read.php');
      setJadwalList(res.data);
    } catch (err) {
      console.error('Gagal ambil jadwal:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put('/penumpang/update.php', form);
      } else {
        await axios.post('/penumpang/create.php', form);
      }

      setForm({ id: '', nama: '', nik: '', hp: '', email: '', jadwal_id: '' });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error('Gagal simpan data:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/penumpang/delete.php', { data: { id } });
      fetchData();
    } catch (err) {
      console.error('Gagal hapus data:', err);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({ id: '', nama: '', nik: '', hp: '', email: '', jadwal_id: '' });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchData();
    fetchJadwal();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manajemen Penumpang</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Form Penumpang</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID"
              type="text"
              fullWidth
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nama"
              fullWidth
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="NIK"
              fullWidth
              value={form.nik}
              onChange={(e) => setForm({ ...form, nik: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="No. HP"
              fullWidth
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Pilih Jadwal"
              fullWidth
              value={form.jadwal_id}
              onChange={(e) => setForm({ ...form, jadwal_id: e.target.value })}
              sx={{ minWidth: 250 }} 
              InputProps={{
                sx: {
                  height: 60,
                  alignItems: 'center',
                },
              }}
            >
              {jadwalList.map((j) => (
                <MenuItem
                  key={j.id}
                  value={j.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 1.5,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Jadwal #{j.id} — {j.tujuan}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {j.tanggal || j.tanggal_berangkat} | {j.jam || j.jam_berangkat}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid><br />
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSubmit}>
                {isEditing ? 'Update' : 'Simpan'}
              </Button>
              {isEditing && (
                <Button sx={{ ml: 2 }} onClick={handleCancel}>
                  Batal
                </Button>
              )}
            </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>NIK</TableCell>
              <TableCell>No. HP</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Jadwal ID</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.nik}</TableCell>
                <TableCell>{item.hp}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.jadwal_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
