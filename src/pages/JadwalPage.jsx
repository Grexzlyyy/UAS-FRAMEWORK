import { useState, useEffect } from 'react';
import axios from '../api/apiclient';
import {
  Container, Typography, TextField, Button,
  Table, TableRow, TableHead, TableBody, TableCell,
  Grid, MenuItem, Select, InputLabel, FormControl,
  Snackbar, Alert
} from '@mui/material';

export default function JadwalPage() {
  const [data, setData] = useState([]);
  const [busList, setBusList] = useState([]);
  const [form, setForm] = useState({
    id: '',
    bus_id: '',
    tanggal: '',
    jam: '',
    tujuan: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

  const fetchData = async () => {
    try {
      const res = await axios.get('/jadwal/read.php');
      setData(res.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  const fetchBus = async () => {
    try {
      const res = await axios.get('/bus/read.php');
      setBusList(res.data);
    } catch (err) {
      console.error('Gagal mengambil data bus:', err);
    }
  };

  const isDuplicateSchedule = () => {
    return data.some((item) =>
      item.bus_id === form.bus_id &&
      item.tanggal === form.tanggal &&
      item.jam === form.jam &&
      item.id !== form.id
    );
  };

  const handleSubmit = async () => {
    if (isDuplicateSchedule()) {
      setAlert({
        open: true,
        message: 'Jadwal bentrok! Bus sudah memiliki jadwal di tanggal dan jam tersebut.',
        severity: 'warning',
      });
      return;
    }

    try {
      if (isEditing) {
        await axios.put('/jadwal/update.php', form);
      } else {
        await axios.post('/jadwal/create.php', form);
      }

      setForm({ id: '', bus_id: '', tanggal: '', jam: '', tujuan: '' });
      setIsEditing(false);
      fetchData();

      setAlert({
        open: true,
        message: isEditing ? 'Jadwal berhasil diperbarui.' : 'Jadwal berhasil ditambahkan.',
        severity: 'success',
      });
    } catch (err) {
      setAlert({
        open: true,
        message: 'Gagal menyimpan data. Silakan cek koneksi atau data yang dimasukkan.',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/jadwal/delete.php', { data: { id } });
      fetchData();
      setAlert({
        open: true,
        message: 'Jadwal berhasil dihapus.',
        severity: 'info',
      });
    } catch (err) {
      setAlert({
        open: true,
        message: 'Gagal menghapus jadwal.',
        severity: 'error',
      });
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      bus_id: item.bus_id,
      tanggal: item.tanggal,
      jam: item.jam,
      tujuan: item.tujuan
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({ id: '', bus_id: '', tanggal: '', jam: '', tujuan: '' });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchData();
    fetchBus();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manajemen Jadwal Keberangkatan
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ID Jadwal"
            type="number"
            fullWidth
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="bus-label">Pilih Bus</InputLabel>
            <Select
              labelId="bus-label"
              value={form.bus_id}
              label="Pilih Bus"
              onChange={(e) => setForm({ ...form, bus_id: e.target.value })}
            >
              {busList.map((bus) => (
                <MenuItem key={bus.id} value={bus.id}>
                  {bus.id} - {bus.nama_bus}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tujuan"
            fullWidth
            value={form.tujuan}
            onChange={(e) => setForm({ ...form, tujuan: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tanggal"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Jam"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.jam}
            onChange={(e) => setForm({ ...form, jam: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Bus ID</TableCell>
            <TableCell>Tujuan</TableCell>
            <TableCell>Tanggal</TableCell>
            <TableCell>Jam</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.bus_id}</TableCell>
                <TableCell>{item.tujuan}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.jam}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">Tidak ada data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}