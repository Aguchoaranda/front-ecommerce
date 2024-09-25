"use client";

import { login } from "@/helpers/auth.helper";
import { validateLoginForm } from "@/helpers/validate";
import { IErrorsProps, IloginProps } from "@/interfaces/Card.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoginView: React.FC = () => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<IloginProps>(initialState);
  const [errors, setErrors] = useState<IErrorsProps>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(userData);
    const { token, user } = response;

    localStorage.setItem("userSession", JSON.stringify({ token, user }));

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
      title: "Login in successfully",
    });
    router.push("/");
  };

  useEffect(() => {
    const errors = validateLoginForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-lg max-w-md mx-auto text-center shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Login to Apple Store
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-lg"
        >
          <div>
            <label
              htmlFor="email_address"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Email
            </label>
            <input
              id="email_address"
              type="email"
              name="email"
              value={userData.email}
              placeholder="agu@gmail.com"
              onChange={handleChange}
              className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-m"
            />
            {errors.email && (
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              placeholder="******"
              onChange={handleChange}
              className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-m"
            />
            {errors.password && (
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!!errors.email}
            className="py-2 px-4 font-bold rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-blue-500"
            style={{ marginTop: "10px" }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
