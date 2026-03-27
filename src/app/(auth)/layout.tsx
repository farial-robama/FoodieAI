// import Link from "next/link";
// import { UtensilsCrossed } from "lucide-react";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* Left panel — branding */}
//       <div
//         className="hidden lg:flex flex-col justify-between p-12"
//         style={{ backgroundColor: "var(--color-primary)" }}
//       >
//         <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
//           <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
//             <UtensilsCrossed size={18} className="text-white" />
//           </div>
//           FoodieAI
//         </Link>

//         <div>
//           <p className="text-5xl font-bold text-white leading-tight mb-4">
//             Discover the best food in your city
//           </p>
//           <p className="text-white/70 text-lg">
//             Join 50,000+ food lovers getting AI-powered restaurant recommendations every day.
//           </p>
//         </div>

//         <div className="flex flex-col gap-4">
//           {[
//             { name: "Tasnim R.", text: "Found my favourite biryani spot in 30 seconds!", avatar: "T" },
//             { name: "Arif H.", text: "The AI chatbot is incredibly accurate.", avatar: "A" },
//           ].map((t) => (
//             <div key={t.name} className="flex items-start gap-3 bg-white/10 rounded-2xl p-4">
//               <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                 {t.avatar}
//               </div>
//               <div>
//                 <p className="text-white text-sm">"{t.text}"</p>
//                 <p className="text-white/60 text-xs mt-1">— {t.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right panel — form */}
//       <div className="flex items-center justify-center p-6 bg-[var(--color-warm)] dark:bg-stone-950">
//         <div className="w-full max-w-md">
//           {/* Mobile logo */}
//           <Link
//             href="/"
//             className="flex lg:hidden items-center gap-2 font-bold text-lg mb-8"
//           >
//             <div
//               className="w-8 h-8 rounded-xl flex items-center justify-center"
//               style={{ backgroundColor: "var(--color-primary)" }}
//             >
//               <UtensilsCrossed size={16} className="text-white" />
//             </div>
//             <span className="text-stone-900 dark:text-white">
//               Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
//             </span>
//           </Link>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }



import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left — branding */}
      <div
        className="hidden lg:flex flex-col justify-between p-12"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <UtensilsCrossed size={18} className="text-white" />
          </div>
          FoodieAI
        </Link>

        <div>
          <p className="text-5xl font-bold text-white leading-tight mb-4">
            Discover the best food in your city
          </p>
          <p className="text-white/70 text-lg">
            Join 50,000+ food lovers getting AI-powered restaurant recommendations every day.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { name: "Tasnim R.", text: "Found my favourite biryani spot in 30 seconds!", avatar: "T" },
            { name: "Arif H.",   text: "The AI chatbot is incredibly accurate.",          avatar: "A" },
          ].map((t) => (
            <div key={t.name} className="flex items-start gap-3 bg-white/10 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="text-white text-sm">"{t.text}"</p>
                <p className="text-white/60 text-xs mt-1">— {t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-warm)] dark:bg-stone-950 min-h-screen">

        {/* Mobile logo */}
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 font-bold text-lg mb-6 self-start"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <UtensilsCrossed size={16} className="text-white" />
          </div>
          <span className="text-stone-900 dark:text-white">
            Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
          </span>
        </Link>

        {/* Demo credentials card */}
        <div className="w-full max-w-md mb-4 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">
            Demo credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-amber-700 dark:text-amber-400">
            <div>
              <p className="font-medium mb-0.5">User account</p>
              <p>user@example.com</p>
              <p>Password: User@123409</p>
            </div>
            <div>
              <p className="font-medium mb-0.5">Admin account</p>
              <p>admin@example.com</p>
              <p>Password: Admin@123408</p>
            </div>
          </div>
        </div>

        {/* Clerk widget */}
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
