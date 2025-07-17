// "use client";

// import { useState } from "react";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Logging in as ${email}`);
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
//       <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
//           <input
//             type="email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
//         >
//           Sign In
//         </button>
//       </form>
//       <p className="mt-6 text-sm text-center text-gray-600">
//         Don’t have an account?{" "}
//         <a href="/register" className="text-blue-600 hover:underline">
//           Register
//         </a>
//       </p>
//     </div>
//   );
// }