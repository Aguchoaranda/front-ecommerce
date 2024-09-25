"use client";

import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/Card.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RegisterView: React.FC = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  };

  const [userData, setUserData] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(userData);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Registered in successfully"
    });
    router.push("/login");
  };

  useEffect(() => {
    const errors = validateRegisterForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-lg max-w-md mx-auto text-center shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Register in Apple Store
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-4 bg-white rounded-lg"
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

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={userData.name}
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-m"
            />
            {errors.name && (
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={userData.address}
              placeholder="123 Main St"
              onChange={handleChange}
              className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-m"
            />
            {errors.address && (
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.address}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={userData.phone}
              placeholder="035311383"
              onChange={handleChange}
              className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-m"
            />
            {errors.phone && (
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.phone}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!!errors.email}
            className="py-2 px-4 font-bold rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-blue-500"
            style={{ marginTop: "10px" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
