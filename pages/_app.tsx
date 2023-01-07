import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${inter.className} font-sans`}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        theme="dark"
      />
    </main>
  );
};

export default App;
