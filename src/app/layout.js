import { lexend, nunito } from "@/helpers/fonts";
import "../styles/global.scss"; //bootstrap scss icinde

export const metadata = {
  title: {
    template: "%s | COSMO SHOP",
    default: "COSMO SHOP | Cheap Electronics",
  },
  description:
    "Cosmo Shop - Cheap Electronics - Laptops, Phones, Tablets - Best Prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
