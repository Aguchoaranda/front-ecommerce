// // src/app/product/[productId]/page.tsx
// import { getProductsById } from "@/helpers/products.helpers";
// import { ProductDetail } from "@/views/ProductDetail/ProductDetail";
// import React from "react";

// // Define el componente como asincrónico
// const Detail = async ({ params }: { params: { productId: string } }) => {
//   const product = await getProductsById(params.productId);
  
//   return (
//     <div>
//       <ProductDetail {...product} />
//     </div>
//   );
// };

// // No es necesario exportar como default, pero si lo haces, asegúrate de no tener conflictos en las rutas.
// export default Detail;


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


