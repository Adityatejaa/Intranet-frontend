'use client';

import { useEffect, useState } from 'react';

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function SuperAdminPage() {
  const [superAdmin, setSuperAdmin] = useState<{ name?: string; email?: string; role?: string }>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
  const stored = localStorage.getItem('user');
  if (stored) {
    setSuperAdmin(JSON.parse(stored));
  }

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Optional: add authorization header if needed
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  fetchEmployees();
}, []);


  const handleUpdate = (updated: Employee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updated.id ? updated : emp))
    );
    setEditingEmployee(null);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Top Right Buttons */}
      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={() => setShowProfile(prev => !prev)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {showProfile ? 'Hide Profile' : 'Profile'}
        </button>
        <button
          onClick={() => setShowEmployees(prev => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showEmployees ? 'Hide Employees' : 'Employee Details'}
        </button>
      </div>

      {/* Super Admin Profile */}
      {showProfile && (
        <div className="absolute top-20 right-6 bg-white shadow-xl rounded-xl p-4 w-64 z-10">
          <h3 className="text-lg font-semibold mb-2">Super Admin Profile</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Name:</strong> {superAdmin.name}</p>
            <p><strong>Email:</strong> {superAdmin.email}</p>
            <p><strong>Role:</strong> {superAdmin.role || 'Super Admin'}</p>
          </div>
        </div>
      )}

      {/* Employee List */}
      {showEmployees && (
        <div className="mt-24 bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Employee List</h2>
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.role}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => setEditingEmployee(emp)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Update Employee</h2>
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Name"
              value={editingEmployee.name}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, name: e.target.value })
              }
            />
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Email"
              value={editingEmployee.email}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, email: e.target.value })
              }
            />
            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Role"
              value={editingEmployee.role}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, role: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingEmployee(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleUpdate(editingEmployee)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Title */}
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">Super Admin Dashboard</h1>
      </div>
    </div>
  );
}

