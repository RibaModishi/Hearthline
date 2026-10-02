import type { Metadata } from "next";
import { Instrument_Sans, Silkscreen } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const pixel = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-face",
});

export const metadata: Metadata = {
  title: "Hearthline",
  description: "A mill you can watch. Six specialist lines carry briefs from intake to the dock.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${pixel.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
