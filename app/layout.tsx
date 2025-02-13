import "./globals.css"; // Import global CSS styles
import { Inter } from "next/font/google"; // Import the Inter font from Google Fonts
import Providers from "./components/Providers"; // Import the Providers component
import Header from "./components/Header"; // Import the Header component

const inter = Inter({ subsets: ["latin"] }); // Initialize the Inter font with Latin subset

// Metadata for the document
export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}