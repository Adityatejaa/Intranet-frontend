'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  name: string;
  email: string;
  role: string;
  exp: number;
};

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: name,   // ✅ Fix: changed from username to name
          password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await res.json(); // { token: '...' }
      const decoded: DecodedToken = jwtDecode(data.token);

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(decoded));

      // Redirect based on role
      switch (decoded.role) {
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'SUPERADMIN':
          router.push('/superadmin');
          break;
        case 'EMPLOYEE':
          router.push('/employee');
          break;
        default:
          setError('Unknown user role');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
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
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            autoComplete="username"
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            autoComplete="current-password"
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
