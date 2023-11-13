"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch("/api/checklogin");
      if (response.ok) {
        // User is logged in, redirect to home page
        router.push("/");
      }
    };

    checkUser();
  }, []);
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setApiError(error.message);
      // Clear the error message after 5 seconds.
      setTimeout(() => {
        setApiError(null);
      }, 5000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-md p-6 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="border p-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="border p-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Login"
            className="bg-blue-500 text-white p-2 cursor-pointer"
          />
          <div className="flex justify-between">
            <Link href="/reset-password" className="text-blue-500">
              Reset Password
            </Link>
            <Link href="/create-account" className="text-blue-500">
              Create Account
            </Link>
          </div>
          {apiError &&
            <div
              style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                backgroundColor: "red",
                color: "white",
                padding: "10px"
              }}
            >
              {apiError}
            </div>}
        </form>
      </div>
    </div>
  );
}
