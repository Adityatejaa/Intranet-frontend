// "use client";

// import { useRouter } from "next/navigation";
// import ProfileCard from "@/components/ProfileCard";

// export default function DashboardPage() {
//   const router = useRouter();

//   const handleLogout = () => {
//     // TODO: clear auth session
//     alert("Logging out...");
//     router.push("/login");
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white flex flex-col items-center justify-center px-4 py-10">
//       <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
//       <ProfileCard />
//       <button
//         onClick={handleLogout}
//         className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
//       >
//         Logout
//       </button>
//     </main>
//   );
// }
