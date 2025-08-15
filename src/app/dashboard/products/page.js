import { DashboardProductList } from "@/components/DashboardProductList";
import React from "react";

export const metadata = {
  title: "Products | COSMO SHOP",
  description: "Explore our range of products",
};

const page = async () => {
  const res = await fetch(
    "https://687f739aefe65e520089c219.mockapi.io/products"
  );
  const data = await res.json();

  return <DashboardProductList products={data} />;
};

export default page;
