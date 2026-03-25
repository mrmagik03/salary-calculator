import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysalarycalculator.co"),
  title: {
    default: "My Salary Calculator",
    template: "%s | My Salary Calculator",
  },
  description:
    "Convert hourly pay to salary, salary to hourly, and estimate take-home pay by state.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
