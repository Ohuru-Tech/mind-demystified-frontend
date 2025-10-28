import Script from "next/script";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang={"en"}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1YVVFDS2VJ"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1YVVFDS2VJ');
          `}
        </Script>
      </head>
      <body style={{ backgroundColor: "#FEFBF5" }}>{children}</body>
    </html>
  );
}
