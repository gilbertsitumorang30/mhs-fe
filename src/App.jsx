import React, { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    position: "",
    salary: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, position, salary } = formData;

    if (!id || !name || !position || !salary) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editMode) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? formData : emp))
      );
      setEditMode(false);
    } else {
      // Cek id unik
      if (employees.some((emp) => emp.id === id)) {
        alert("ID sudah digunakan!");
        return;
      }
      setEmployees([...employees, formData]);
    }

    setFormData({ id: "", name: "", position: "", salary: "" });
  };

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setFormData(employee);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">CRUD Employee</h1>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-8"
      >
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Employee ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            disabled={editMode}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white rounded-lg ${editMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {editMode ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Table Data */}
      <div className="w-full max-w-3xl">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada data pegawai.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.position}</td>
                  <td className="p-3">Rp {Number(emp.salary).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
