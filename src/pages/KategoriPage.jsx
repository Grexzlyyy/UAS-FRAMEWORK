import { useState, useEffect } from 'react';
import axios from '../api/apiclient';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';

export default function KategoriPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: '', nama_kategori: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get('/kategori/read.php');
      setData(res.data);
    } catch (err) {
      console.error('Gagal ambil data:', err);
    }
  };

  //konfigurasi ambildata dari backend dan db
const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      id: parseInt(form.id),
    };
//pengkondisian untuk button simpan/edit
    if (isEditMode) {
      await axios.put('/kategori/update.php', payload);
    } else {
      await axios.post('/kategori/create.php', payload);
    }
//menambahkan datanya
    setForm({ id: '', nama_kategori: '' });
    setIsEditMode(false);
    fetchData();
  } catch (err) {
    console.error('Gagal simpan data:', err.response?.data || err.message);
  }
};

//untuk menghapus data
  const handleDelete = async (id) => {
    try {
      await axios.delete('/kategori/delete.php', { data: { id } }); //dilakukan dari backend
      fetchData();
    } catch (err) {
      console.error('Gagal hapus kategori:', err);
    }
  };

//edit
const handleEdit = (item) => {
  setForm(item); 
  setIsEditMode(true); //set dulu isedit jadi true agar bisa diedit
};

//hook
  useEffect(() => { //yang dijalankan duluan
    fetchData(); //mengambil data
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manajemen Kategori Bus
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2} mb={2}>
        <TextField
          label="ID"
          type="number"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <TextField
          label="Nama Kategori"
          value={form.nama_kategori}
          onChange={(e) => setForm({ ...form, nama_kategori: e.target.value })}
        />
      </Box>

      <Box mb={2}>
        <Button onClick={handleSubmit} variant="contained">
          {isEditMode ? 'Update' : 'Simpan'}
        </Button>
        {isEditMode && (
          <Button onClick={() => {
            setForm({ id: '', nama_kategori: '' });
            setIsEditMode(false);
          }} sx={{ ml: 2 }}>
            Batal
          </Button>
        )}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama Kategori</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nama_kategori}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">Tidak ada data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}