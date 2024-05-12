import { Inter } from "next/font/google";
import Header from "../header.js";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const showHeader = router.pathname !== "/"; // Antar at innloggingssiden har ruten "/login"

  return (
    <div className={inter.className}>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
