'use client';

import { useEffect, useState } from 'react';

export default function EmployeePage() {
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string }>({});
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Profile button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {showProfile ? 'Hide Profile' : 'Profile'}
        </button>
      </div>

      {/* Profile card */}
      {showProfile && (
        <div className="absolute top-20 right-6 bg-white shadow-lg rounded-xl p-4 w-64 z-10">
          <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'Employee'}</p>
          </div>
        </div>
      )}

      {/* Centered Dashboard Title */}
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">Employee Dashboard</h1>
      </div>
    </div>
  );
}
