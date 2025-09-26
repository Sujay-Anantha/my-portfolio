//layout.tsx
import "./globals.css";

export const metadata = {
  title: "Sujay Anantha — Portfolio",
  description: "ML/AI Engineer building data products and delightful UX.",
  metadataBase: new URL("https://your-domain.com"), // change later
  openGraph: {
    title: "Sujay Anantha — Portfolio",
    description: "ML/AI Engineer portfolio",
    url: "https://your-domain.com",
    siteName: "Your Name",
    images: ["/Circular_Headshot.png"], // put an image in /public
    locale: "en_US",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
