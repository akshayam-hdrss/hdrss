import { Inter, Koulen } from "next/font/google";
import "./globals.css";


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
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
      </head>
      <body className={inter.className}>
        <main className="bg-white h-full">{children}</main>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async ({ children }) => {
  return { children };
};
