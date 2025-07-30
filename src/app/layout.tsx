import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "components/theme-provider";
import { AUTHOR } from "lib/constants/brand";
import "styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${AUTHOR.FULL_NAME} - ${AUTHOR.TITLE}`,
  description: "Portfolio of a Senior Software Engineer specializing in scalable systems with Python, Next.js, and Kubernetes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}