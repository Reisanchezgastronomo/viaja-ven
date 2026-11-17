import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/plan-context";
import AppShell from "@/components/layout/AppShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});

// Dominio público de la plataforma. Debe coincidir con la URL que se comparte.
const siteUrl = "https://viaja-ven-rei-sanchez.vercel.app";
const shareImage = siteUrl + "/api/og?v=2";
const pageTitle = "VIAJA | Venezuela Auténtica · Demostrador gastronómico";
const shareDescription =
  "Explora el potencial de rutas y experiencias gastronómicas organizadas en Colonia Tovar. Demostrador ilustrativo de Rei Sánchez | Dirección Ejecutiva, sin reservas ni pagos.";

export const metadata: Metadata = {
  title: pageTitle,
  description: shareDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Venezuela Auténtica | VIAJA",
    description:
      "Del valor de un territorio a experiencias gastronómicas organizadas. VIAJA: demostrador de Colonia Tovar, sin reservas ni pagos.",
    url: siteUrl,
    siteName: "Venezuela Auténtica",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Venezuela Auténtica | VIAJA. Del valor de un territorio a experiencias gastronómicas organizadas.",
        type: "image/png",
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venezuela Auténtica | VIAJA",
    description:
      "Rutas y experiencias gastronómicas organizadas. Demostrador de Colonia Tovar, sin reservas ni pagos.",
    images: [shareImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <PlanProvider>
          <AppShell>{children}</AppShell>
        </PlanProvider>
      </body>
    </html>
  );
}
