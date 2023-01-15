import 'styles/root.css'
import '@primer/css/index.scss'
import Head from 'next/head'

import { useSession, signIn, signOut } from "next-auth/react"
import Auth from '@/src/components/Auth';


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {


    return (
      <html lang="en">
        <Head>
            <title>Shalom Farms Bulletin</title>
            <meta name="description" content="Shalom Farms Bulletin" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
            <Auth>
            {children}
            <footer className="pb-10"></footer>
            </Auth>
        </body>
      </html>
    );
  }