
import { getProductsById } from "@/helpers/products.helpers";
import { ProductDetail } from "@/views/ProductDetail/ProductDetail";
import React from "react";

export const Detail: React.FC <{params: {productId:string}}> = async ({params}) => {
  const product = await getProductsById(params.productId)
  return (
  <div> 
    <ProductDetail {...product}/>
  </div>)
};

export default Detail;


