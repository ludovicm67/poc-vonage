import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/homepage";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Vonage POC</title>
        <meta
          name="description"
          content="This is a proof of concept using Vonage SDK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </div>
  );
};

export default Home;
