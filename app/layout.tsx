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
      <body>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .skip-link {
                position: absolute;
                left: 12px;
                top: 12px;
                z-index: 9999;
                padding: 10px 14px;
                border-radius: 12px;
                background: #ffffff;
                color: #111827;
                border: 3px solid #67e8f9;
                font-weight: 700;
                text-decoration: none;
                box-shadow: 0 0 0 2px rgba(0,0,0,0.25);
                transform: translateY(-160%);
                transition: transform 0.15s ease;
              }

              .skip-link:focus {
                transform: translateY(0);
              }

              a:focus-visible,
              button:focus-visible,
              input:focus-visible,
              select:focus-visible,
              textarea:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.45);
                outline-offset: 2px;
              }
            `,
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
