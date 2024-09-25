'use client'

import IProduct, { IUserSession } from "@/interfaces/Card.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProductDetail: React.FC<IProduct> = ({
  name,
  image,
  description,
  id,
  categoryId,
  price,
  stock,
}) => {
  

  const [userData, setUserData] = useState<IUserSession>();

  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, []);

  const handleAddToCart = () => {
    if (!userData?.token) { //Si user data y token no exisiten salta la alerta (Valida que el usuario exista)
      Toast.fire({
        icon: "error",
        title: "You must be logged to add products",
      });
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");// Traer parseada la info del local storage y si no hay nad guarda un arreglo
      const productExist = cart.some((product: IProduct) => { // averigua si hay algo en el arreglo
        if (product.id === id) return true;
        return false;
      });
      if (productExist) {
        Toast.fire({
          icon: "warning",
          title: "this product already exist in your cart",
        });
        router.push("/cart");
      } else {
        cart.push({
          name,
          image,
          description,
          categoryId,
          price,
          stock,
          id,
        });
        localStorage.setItem("cart", JSON.stringify(cart)); // Seteo array del producto
        Toast.fire({
          icon: "success",
          title: "Product added to your cart",
        });
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto text-center">
      <h2 className="text-center p-2"> {name}</h2>

      <img
        className="block mx-auto"
        src={image}
        alt={`Imagen del producto ${name}`}
      />

      <p className="text-lg font-semibold mb-2">{description}</p>
      <p className="text-xl font-bold text-gray-800 mb-2">Precio: ${price}</p>
      <p className="text-base font-semibold text-gray-800 mb-4">Stock: {stock}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-150"
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
};
