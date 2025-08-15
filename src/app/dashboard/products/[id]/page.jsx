import { DashboardEditProduct } from "@/components/DashboardEditProduct";
import React from "react";

const API_URL = "https://687f739aefe65e520089c219.mockapi.io/products";

const Page = async ({ params }) => {
  const { id } = await params;
  //Fetch the product
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  return <DashboardEditProduct product={data} />;
};

export default Page;
