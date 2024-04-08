// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import RootLayout from "../components/layout/layout.js"; // Oppdater stien etter behov, antar at den ligger i src/app

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title || "Default Dashboard Title"}</title>
        <meta
          name="description"
          content={
            pageProps.description || "Default description of the Dashboard"
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
