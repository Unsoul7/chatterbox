import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyContextProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatterBox : Social Media for GenZ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />

      </head>
      <body className={inter.className}>
        <MyContextProvider>
          {children}
        </MyContextProvider>
      </body>
    </html>
  );
}
