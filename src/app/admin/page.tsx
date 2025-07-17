'use client';

import { useEffect, useState } from 'react';

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminPage() {
  const [admin, setAdmin] = useState<{ name?: string; email?: string; role?: string }>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    // Fetch admin profile
    fetch('http://localhost:3001/api/admin/me')
      .then(res => res.json())
      .then(data => setAdmin(data))
      .catch(err => console.error('Admin fetch failed:', err));

    // Fetch employees
    fetch('http://localhost:3001/api/admin/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Employee list fetch failed:', err));
  }, []);

  const handleUpdate = async (updated: Employee) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error('Failed to update employee');

      const data = await res.json();

      setEmployees(prev =>
        prev.map(emp => (emp.id === data.id ? data : emp))
      );
      setEditingEmployee(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
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

      {/* Profile card */}
      {showProfile && (
        <div className="absolute top-20 right-6 bg-white shadow-xl rounded-xl p-4 w-64 z-10">
          <h3 className="text-lg font-semibold mb-2">Admin Profile</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Role:</strong> {admin.role || 'Admin'}</p>
          </div>
        </div>
      )}

      {/* Employee table */}
      {showEmployees && (
        <div className="mt-24 bg-white rounded-xl shadow p-6">
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
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setEditingEmployee(emp)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
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

      {/* Admin Dashboard title */}
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
    </div>
  );
}

