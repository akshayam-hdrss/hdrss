import { Inter, Koulen } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
  display: "swap",
});

export const metadata = {
  title: "HDRSS",
  description: "HDRSS Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${koulen.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <main className="bg-background h-full">{children}</main>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async ({ children }) => {
  return { children };
};
