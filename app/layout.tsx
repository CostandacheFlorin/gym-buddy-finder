import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "../context/UserContext";
import Navigation from "@/components/Navigation";
import AuthWrapper from "../components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Buddy Finder",
  description: "The easy way to find someone to workout with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <UserContextProvider>
            <AuthWrapper>
              <Navigation />
              {children}
            </AuthWrapper>
          </UserContextProvider>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
