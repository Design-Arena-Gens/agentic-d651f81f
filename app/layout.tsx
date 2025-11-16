import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Alerts Agent",
  description: "Your intelligent job search assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
