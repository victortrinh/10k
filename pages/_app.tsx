import "@styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { Loading } from "@components/Loading";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Head from "next/head";
import Maintenance from "@components/Maintenance";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  function getShownComponent() {
    if (process.env.MAINTENANCE_MODE === "true") {
      return <Maintenance />;
    }

    if (loading ){
      return <Loading />;
    }

    return <Component {...pageProps} />;
  }

  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
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
        <title>
          10K
        </title>
      </Head>
      <ThemeProvider attribute="class">
        {mounted && (
          <main className={`${inter.className} font-sans`}>
            {getShownComponent()}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              closeOnClick
              draggable
              theme="dark"
            />
          </main>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
