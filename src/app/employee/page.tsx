'use client';

import { useEffect, useState } from 'react';

interface Employee {
  name: string;
  email: string;
  role: string;
}

export default function EmployeePage() {
  const [user, setUser] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch('http://localhost:3000/employee'); // Adjust URL if needed
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Profile card always visible on top right */}
      <div className="absolute top-6 right-6 bg-white shadow-lg rounded-xl p-4 w-64">
        <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role || 'Employee'}</p>
        </div>
      </div>

      {/* Centered Dashboard Title */}
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">Employee Dashboard</h1>
      </div>
    </div>
  );
}

