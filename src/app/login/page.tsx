'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with real authentication logic
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = { name: 'Admin', email, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/admin');
    } else if (email === 'superadmin@example.com' && password === 'super123') {
      const user = { name: 'Super Admin', email, role: 'superadmin' };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/superadmin');
    } else if (email === 'employee@example.com' && password === 'emp123') {
      const user = { name: 'Employee', email, role: 'employee' };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/employee');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
