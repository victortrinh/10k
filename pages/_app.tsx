import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>10K</title>
      </Head>
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
    </>
  </ThemeProvider>
);

export default App;
