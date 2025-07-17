// "use client";

// import { useState } from "react";

// export default function RegisterForm() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     alert(`Registering ${form.name}`);
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
//       <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="John Doe"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="you@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
//         >
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-6 text-sm text-center text-gray-600">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-600 hover:underline">
//           Login
//         </a>
//       </p>
//     </div>
//   );
// }
