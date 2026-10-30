import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "High Intensity Football | Youth Flag Football & 7v7 San Diego",
    template: "%s | High Intensity Football"
  },
  description: "San Diego's most decorated youth flag football program. 150+ championships. 2022 NFL Flag National Champions. Nationals every year since 2014. Boys flag football, girls flag football, and high school 7v7.",
  keywords: [
    "youth flag football San Diego",
    "kids flag football San Diego",
    "youth 7v7 San Diego",
    "youth football San Diego",
    "NFL flag football San Diego",
    "flag football near me San Diego",
    "High Intensity Football",
    "High Intensity SD",
    "youth sports San Diego",
    "youth football program San Diego",
    "San Diego youth athletics",
    "7v7 football San Diego",
    "flag football 2026",
  ],
  authors: [{ name: "High Intensity Football" }],
  creator: "High Intensity Football",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://highintensityfootball.com",
    siteName: "High Intensity Football",
    title: "High Intensity Football | Youth Flag Football & 7v7 San Diego",
    description: "San Diego's most decorated youth football program. 150+ championships. 2022 NFL Flag National Champions. All ages welcome.",
    images: [
      {
        url: "https://highintensityfootball.com/archive/2022-national-champions.jpg",
        width: 1200,
        height: 630,
        alt: "High Intensity Football - 2022 NFL Flag National Champions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High Intensity Football | Youth Flag Football San Diego",
    description: "150+ championships. 2022 National Champions. All ages, all levels. San Diego.",
    images: ["https://highintensityfootball.com/archive/2022-national-champions.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  alternates: {
    canonical: "https://highintensityfootball.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "name": "High Intensity Football",
              "url": "https://highintensityfootball.com",
              "logo": "https://highintensityfootball.com/hi-logo-full.jpg",
              "description": "San Diego's most decorated youth flag football and 7v7 program. Founded 2014. 150+ championships. 2022 NFL Flag National Champions.",
              "foundingDate": "2014",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Diego",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "sport": "American Football",
              "email": "director@highintensityfootball.com",
              "areaServed": [
                "San Diego", "Poway", "North County San Diego", "San Diego County"
              ],
              "sameAs": [
                "https://www.instagram.com/highintensitysd",
                "https://www.tiktok.com/@highintensitysd",
                "https://twitter.com/highintensitysd"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
