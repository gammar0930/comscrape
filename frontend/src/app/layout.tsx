"use client";
import "@fontsource/source-code-pro";

import NavigationBar from "./components/navigation-bar";
import ThemeProvider from "./toggle-theme-provider";
import Head from "./head";

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <ThemeProvider>
          {/* <Banner /> */}
          <NavigationBar />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
