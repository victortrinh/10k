import { AppProps } from "next/app";
import "../styles/global.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${inter.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
