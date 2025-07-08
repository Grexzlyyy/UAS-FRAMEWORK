import { useState, useEffect } from 'react';
import axios from '../api/apiclient';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function BusPage() {
  const [data, setData] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [form, setForm] = useState({
    id: '',
    nama_bus: '',
    kapasitas: '',
    kategori_id: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get('/bus/read.php');
      setData(res.data);
    } catch (err) {
      console.error('Gagal fetch data:', err);
    }
  };

  const fetchKategori = async () => {
    try {
      const res = await axios.get('/kategori/read.php');
      setKategoriList(res.data);
    } catch (err) {
      console.error('Gagal fetch kategori:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put('/bus/update.php', form);
      } else {
        await axios.post('/bus/create.php', form);
      }
      setForm({ id: '', nama_bus: '', kapasitas: '', kategori_id: '' });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error('Gagal simpan data:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/bus/delete.php', { data: { id } });
      fetchData();
    } catch (err) {
      console.error('Gagal hapus data:', err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      nama_bus: item.nama_bus,
      kapasitas: item.kapasitas,
      kategori_id: item.kategori_id,
    });
    setIsEditing(true);
  };

  const getNamaKategori = (id) => {
    const kategori = kategoriList.find((k) => k.id === id);
    return kategori ? kategori.nama_kategori : '-';
  };

  useEffect(() => {
    fetchData();
    fetchKategori();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manajemen Daftar Bus
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(4, 1fr)' }} gap={2} mb={2}>
        <TextField
          label="ID"
          type="number"
          fullWidth
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <TextField
          label="Nama Bus"
          fullWidth
          value={form.nama_bus}
          onChange={(e) => setForm({ ...form, nama_bus: e.target.value })}
        />
        <TextField
          label="Kapasitas"
          type="number"
          fullWidth
          value={form.kapasitas}
          onChange={(e) => setForm({ ...form, kapasitas: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="kategori-label">Kategori</InputLabel>
          <Select
            labelId="kategori-label"
            value={form.kategori_id}
            label="Kategori"
            onChange={(e) => setForm({ ...form, kategori_id: e.target.value })}
          >
            {kategoriList.map((kategori) => (
              <MenuItem key={kategori.id} value={kategori.id}>
                {kategori.nama_kategori}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <Button onClick={handleSubmit} variant="contained">
          {isEditing ? 'Update' : 'Simpan'}
        </Button>
        {isEditing && (
          <Button
            sx={{ ml: 2 }}
            onClick={() => {
              setForm({ id: '', nama_bus: '', kapasitas: '', kategori_id: '' });
              setIsEditing(false);
            }}
          >
            Batal
          </Button>
        )}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama Bus</TableCell>
            <TableCell>Kapasitas</TableCell>
            <TableCell>ID Kategori</TableCell>
            <TableCell>Nama Kategori</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.nama_bus}</TableCell>
              <TableCell>{item.kapasitas}</TableCell>
              <TableCell>{item.kategori_id}</TableCell>
              <TableCell>{getNamaKategori(item.kategori_id)}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(item.id)}>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}