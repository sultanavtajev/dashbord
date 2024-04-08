import { Inter } from "next/font/google";
import Header from "../header.js";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
}
