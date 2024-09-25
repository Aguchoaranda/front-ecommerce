"use client";
import { createOrder } from "@/helpers/orders.helper";
import IProduct, { IUserSession } from "@/interfaces/Card.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const CartView = () => {
  const [cart, serCart] = useState<IProduct[]>([]);

  const [totalCart, setTotalCart] = useState<number>(0);

  const [userData, setUserData] = useState<IUserSession>();

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
      // controlando que no es undifined y tambien que existe window local storage
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        let totalCart = 0;
        storedCart?.map((item: IProduct) => {
          totalCart = totalCart + item.price;
        }); // Sumo el precio de la compra
        setTotalCart(totalCart);
        serCart(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, []);

  const handleClick = async () => {
    const idProduct: number[] = cart?.map((product) => product.id);
    await createOrder(idProduct, userData?.token!); 
    Toast.fire({
      icon: "success",
      title: "Buy successfuly",
    });
    serCart([]);
    setTotalCart(0);
    localStorage.setItem("cart", "[]");
  };
  return (
    <div className=" flex flex-col items-center justify-between w-full p-4 font-semibold p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto text-center">
      <div className="">
        {cart && cart.length > 0 ? (
          cart?.map((cart: IProduct) => {
            return (
              <div key={cart.id}>
                <img
                  className="max-w-[200px] w-[300px] h-auto "
                  src={cart.image}
                  alt={"Image of the product" + cart.name}
                />
                <section>
                  <p>{cart.name}</p>
                  <p>Price: ${cart.price}</p>
                </section>
              </div>
            );
          })
        ) : (
          <p>You dont have any product in your cart</p>
        )}
      </div>
      <div>
        <p className="m-2">Your total: $ {totalCart}</p>
        {cart.length <= 0 ? (
          <Link className="rounded-xl bg-blue-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-500" href="/">Shopping</Link>
        ) : (
          <button className="rounded-xl bg-blue-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-500" onClick={handleClick}>Checkout</button>
        )}
      </div>
    </div>
  );
};

export default CartView;
