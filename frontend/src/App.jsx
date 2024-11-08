import React, { useEffect, useState } from 'react';
import MahasiswaForm from './MahasiswaForm';
import MahasiswaTable from './MahasiswaTable';

const App = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [formData, setFormData] = useState({ nim: '', nama: '', ipk: '' });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState('');

  // Fetch data mahasiswa
  useEffect(() => {
    fetch('http://localhost:3000/mahasiswa')
      .then(res => res.json())
      .then(data => setMahasiswa(data))
      .catch(console.error);
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Add or edit mahasiswa
  const handleSubmit = () => {
    if (editing) {
      // Edit mahasiswa
      fetch(`http://localhost:3000/mahasiswa/${formData.nim}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          setMahasiswa(mahasiswa.map(mhs => mhs.nim === formData.nim ? formData : mhs));
          resetForm();
        })
        .catch(console.error);
    } else {
      // Add mahasiswa
      fetch('http://localhost:3000/mahasiswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          setMahasiswa([...mahasiswa, formData]);
          resetForm();
        })
        .catch(console.error);
    }
  };

  // Edit mahasiswa
  const editMahasiswa = (nim) => {
    const mhsToEdit = mahasiswa.find(mhs => mhs.nim === nim);
    setFormData(mhsToEdit);
    setEditing(true);
    setShowForm(true);
  };

  // Delete mahasiswa
  const deleteMahasiswa = (nim) => {
    fetch(`http://localhost:3000/mahasiswa/${nim}`, { method: 'DELETE' })
      .then(() => {
        setMahasiswa(mahasiswa.filter(mhs => mhs.nim !== nim));
      })
      .catch(console.error);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ nim: '', nama: '', ipk: '' });
    setEditing(false);
    setShowForm(false);
  };

  // Filter mahasiswa based on search term
  const filteredMahasiswa = mahasiswa.filter(mhs =>
    mhs.nim.includes(search) || mhs.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Data Mahasiswa</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by NIM or Name"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah Mahasiswa
        </button>
      </div>

      {showForm && (
        <MahasiswaForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          resetForm={resetForm}
          isEditing={editing}
        />
      )}

      <MahasiswaTable mahasiswa={filteredMahasiswa} onEdit={editMahasiswa} onDelete={deleteMahasiswa} />
    </div>
  );
};

export default App;
