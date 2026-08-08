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
  <title>MakersFriend - Craft Calculator for Makers & Etsy Sellers</title>
  <meta name="description" content="Free profitability calculator for laser cutting, 3D printing & craft makers. Calculate break-even price vs Etsy market data. Validate designs before investing time." />
  <meta name="keywords" content="craft calculator, profitability calculator, maker calculator, etsy calculator, laser cutting calculator, design profitability" />
</Head>
      <MakersFriend />
    </>
  );
}
