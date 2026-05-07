import "./globals.css";

export const metadata = {
  title: "Makor Securities · Morning Intelligence Platform",
  description:
    "Institutional FX & macro briefing workspace — bespoke market intelligence prepared before the London open.",
  applicationName: "Makor Morning Intelligence",
  authors: [{ name: "Makor Securities London Ltd" }],
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2D2256",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
