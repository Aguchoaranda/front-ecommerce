import React from "react";
import Card from "../Card/Card";
import { getProductsDB } from "@/helpers/products.helpers";
import Link from "next/link";

export const CardList = async () => {
  const products = await getProductsDB();
  return (
    <div className="flex flex-wrap gap-4 p-40 justify-center">
      {products &&
        products?.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card {...product} />
            </Link>
          );
        })}
    </div>
  );
};


