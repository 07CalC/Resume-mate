import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Resumemate",
  description: "Create your professional resume for free with Resumemate. Use our online resume builder to enhance your CV and resume in minutes, delivering a polished and professional result.",
  icons: {
    icon: "https://resumemate.io/icon.png?bfea005cc7a3742a"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
