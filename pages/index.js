import { useEffect } from 'react';
import Head from 'next/head';
import MakersFriend from '../makersfriend';

export default function Home() {
  useEffect(() => {
    // No need to do anything on mount
  }, []);

  return (
    <>
      <Head>
        <title>MakersFriend - Design Profitability Calculator</title>
        <meta name="description" content="Calculate design profitability and viability before you make it. See break-even price vs. Etsy market data." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🔨</text></svg>" />
      </Head>
      <MakersFriend />
    </>
  );
}
