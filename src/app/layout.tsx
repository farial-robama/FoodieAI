// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ThemeProvider } from "@/components/ui/ThemeProvider";
// import "./globals.css";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "FoodieAI — Find Your Next Favourite Meal",
//   description: "Discover restaurants, book tables, and get AI-powered food recommendations.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//           <ThemeProvider>
//             {children}
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodieAI — Find Your Next Favourite Meal",
  description: "Discover restaurants, book tables, and get AI-powered food recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}