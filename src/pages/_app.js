// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import RootLayout from "../components/layout/layout.js"; // Oppdater stien etter behov

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title || "Dashbord"}</title>
        <meta
          name="description"
          content={
            pageProps.description || "Dashbord for å vise data og scripts"
          }
        />
      </Head>
      <RootLayout>
        {" "}
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

export default MyApp;
