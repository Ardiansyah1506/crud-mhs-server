import React, { useState, useEffect } from 'react';

const MahasiswaForm = ({ formData, setFormData, onSubmit, resetForm, isEditing }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h2>
        <input
          type="text"
          name="nim"
          placeholder="NIM"
          value={formData.nim}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
          disabled={isEditing}
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <input
          type="text"
          name="ipk"
          placeholder="IPK"
          value={formData.ipk}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {isEditing ? 'Update' : 'Tambah'}
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaForm;
