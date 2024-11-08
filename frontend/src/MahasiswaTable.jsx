import React from 'react';

const MahasiswaTable = ({ mahasiswa, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="p-4 border-b text-left">NIM</th>
          <th className="p-4 border-b text-left">Nama</th>
          <th className="p-4 border-b text-left">IPK</th>
          <th className="p-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa.map(mhs => (
          <tr key={mhs.nim}>
            <td className="p-4 border-b">{mhs.nim}</td>
            <td className="p-4 border-b">{mhs.nama}</td>
            <td className="p-4 border-b">{mhs.ipk}</td>
            <td className="p-4 border-b">
              <button
                onClick={() => onEdit(mhs.nim)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(mhs.nim)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MahasiswaTable;
