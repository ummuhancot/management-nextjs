import { DashboardNewProduct } from "@/components/DashboardNewProduct";
import { notFound } from "next/navigation";
import React from "react";

const Page = async () => {
  return (
    <>
      <DashboardNewProduct />
    </>
  );
};

export default Page;
