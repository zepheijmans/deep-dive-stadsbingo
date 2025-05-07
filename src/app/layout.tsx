import type { Metadata } from "next";
import "./globals.scss";
import Navigation from "@/components/Navigation";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Stadsbingo",
  description: "Een interactieve bingo-app voor een introducie van de stad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <div className="relative flex flex-col items-center justify-start h-screen max-h-screen overflow-y-scroll">
            {children}

            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
