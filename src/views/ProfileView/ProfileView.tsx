'use client'

import { IUserSession } from "@/interfaces/Card.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProfileView = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  },[]);

  const handleClick = () => {
    localStorage.removeItem("userSession");

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
    Toast.fire({
      icon: "success",
      title: "logout successfuly",
    });
    router.push("/");
  };
  return (
    <div className="font-semibold p-6 bg-gray-50 rounded-xl shadow-lg max-w-lg mx-auto text-center">
      <h1 className="p-2 text-5xl font-bold italic text-gray-800"> Perfil</h1>
      <h3 className="p-1 text-xl text-gray-700"> Bienvenido {userData?.user?.name}</h3>
      <p className="p-1 text-gray-600">Tu correo: {userData?.user?.email}</p>
      <p className="p-2 text-gray-600"> Tu dirreccion de envio es: {userData?.user?.address}</p>
      <button className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-500 disabled:opacity-50" onClick={handleClick} disabled={false}>
        Desconectar
      </button>
    </div>
  );
};

export default ProfileView