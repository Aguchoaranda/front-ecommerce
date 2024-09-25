"use client"
import { getProductsById } from "@/helpers/products.helpers";
import { ProductDetail } from "@/views/ProductDetail/ProductDetail";
import React, { useEffect, useState } from "react";

const Detail: React.FC<{ params: { productId: string } }> = ({ params }) => {
  const [product, setProduct] = useState<any>(null); // Ajusta el tipo según tu estructura de datos

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductsById(params.productId);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [params.productId]);

  if (!product) {
    return <div>Cargando...</div>; // O cualquier indicador de carga
  }

  return (
    <div>
      <ProductDetail {...product} />
    </div>
  );
};

export default Detail;
