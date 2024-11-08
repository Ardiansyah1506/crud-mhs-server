import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import cors from 'cors'


const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());
app.use(express.static(join(process.cwd(), 'public','dist')));
const dataPath = join(process.cwd(), 'data', 'mahasiswa.json');

// Helper untuk membaca data mahasiswa
const readData = () => {
  const data = readFileSync(dataPath);
  return JSON.parse(data);
};

// Helper untuk menulis data mahasiswa
const writeData = (data) => {
  writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get semua mahasiswa
app.get('/mahasiswa', (req, res) => {
  const mahasiswa = readData();
  res.json(mahasiswa);
});

// Get mahasiswa by NIM
app.get('/mahasiswa/:nim', (req, res) => {
  const { nim } = req.params;
  const mahasiswa = readData();
  const result = mahasiswa.find(mhs => mhs.nim === nim);
  result ? res.json(result) : res.status(404).json({ error: 'Mahasiswa not found' });
});

// Tambah mahasiswa
app.post('/mahasiswa', (req, res) => {
  const { nim, nama, ipk } = req.body;
  console.log(`nim : ${nim},nama: ${nama},ipk: ${ipk}`)
  const mahasiswa = readData();
  mahasiswa.push({ nim, nama, ipk });
  writeData(mahasiswa);
  res.status(201).json({ message: 'Mahasiswa added' });
});

// Update mahasiswa
app.put('/mahasiswa/:nim', (req, res) => {
  const { nim } = req.params;
  const { nama, ipk } = req.body;
  const mahasiswa = readData();
  const index = mahasiswa.findIndex(mhs => mhs.nim === nim);

  if (index !== -1) {
    mahasiswa[index] = { nim, nama, ipk };
    writeData(mahasiswa);
    res.json({ message: 'Mahasiswa updated' });
  } else {
    res.status(404).json({ error: 'Mahasiswa not found' });
  }
});

// Delete mahasiswa
app.delete('/mahasiswa/:nim', (req, res) => {
  const { nim } = req.params;
  const mahasiswa = readData();
  const newMahasiswa = mahasiswa.filter(mhs => mhs.nim !== nim);

  if (mahasiswa.length !== newMahasiswa.length) {
    writeData(newMahasiswa);
    res.json({ message: 'Mahasiswa deleted' });
  } else {
    res.status(404).json({ error: 'Mahasiswa not found' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(join(process.cwd(), 'public', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
