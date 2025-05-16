import type { Metadata } from "next";

import "./globals.css";
import { SnackProv } from "@/components/SnackProv";
import { ReduxProvider } from "@/components/ReduxProvider";
import UserFetcher from "@/components/UserFetcher";

export const metadata: Metadata = {
  title: "C.R System",
  description: "Content recommendation for your customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SnackProv>
            <UserFetcher />
            {children}
          </SnackProv>
        </ReduxProvider>
      </body>
    </html>
  );
}
