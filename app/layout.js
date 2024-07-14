import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProviders } from "./Providers";
import Navbar from "@/components/Navbar";
import "./styles.scss";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads Clone",
  description: "A clone of the threads app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProviders>
     
   
          <Toaster position="bottom-center" />
          {children}
        </NextAuthProviders>
      </body>
    </html>
  );
}
