import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyShield | Early support for every learner",
  description: "A calm, intelligent early-warning system for learning teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
