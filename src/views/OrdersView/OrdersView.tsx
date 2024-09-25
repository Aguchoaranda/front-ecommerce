"use client";

import { getOrder } from "@/helpers/orders.helper";
import { IOrder, IUserSession } from "@/interfaces/Card.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersView = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [userData, setUserData] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // controlando que no es undifined y tambien que existe window local storage
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, []);

  const fetchData = async () => {
    const ordersReponse = await getOrder(userData?.token!);
    setOrders(ordersReponse);
  };

  useEffect(() => {
    if (userData?.user.name) {
      userData?.user.name === undefined ? router.push("/login") : fetchData();
    }
  }, [userData?.user]);

  return (
    <div>
      {orders && orders.length > 0 ? (
        orders?.map((orders: IOrder) => {
          return (
            <div className="items-center justify-between w-full p-4 font-semibold p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto text-center" key={orders.id}>
              <section>
                <p>{new Date(orders.date)?.toLocaleDateString()}</p>

                <p>Status:{orders.status.toLocaleUpperCase()}</p>
              </section>
            </div>
          );
        })
      ) : (
        <p className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto text-center font-semibold">You dont have any product in your cart</p>
      )}
    </div>
  );
};

export default OrdersView;
