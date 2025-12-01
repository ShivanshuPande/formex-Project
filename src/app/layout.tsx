import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
/* just figure out the  design */
/*need to find the params of the mechanical components */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Formex",
  description: "Learn and visualise Mechanical Component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}

//--make it happen