"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: "",
        realName: "",
        password: "",
        confirmPassword: "",
        agreement: false
    });
    const [errors, setErrors] = useState({
        email: "",
        realName: "",
        password: "",
        confirmPassword: "",
        agreement: ""
    });

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: "",
            realName: "",
            password: "",
            confirmPassword: "",
            agreement: ""
        };

        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.agreement) {
            newErrors.agreement = "You must agree to the terms.";
        }

        if (Object.values(newErrors).some(error => error !== "")) {
            setErrors(newErrors);
            return;
        }

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        alert(
            response.ok ? "User created successfully." : (await response.json()).error
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 shadow-md p-6 rounded-md">
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email && "border-red-500"
                        }`}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={e =>
                            setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic">{errors.email}</p>
                    )}
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.realName && "border-red-500"
                        }`}
                        type="text"
                        name="realName"
                        placeholder="Full Name"
                        onChange={e =>
                            setFormData({ ...formData, realName: e.target.value })}
                        required
                    />
                    {errors.realName && (
                        <p className="text-red-500 text-xs italic">{errors.realName}</p>
                    )}
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.password && "border-red-500"
                        }`}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={e =>
                            setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs italic">{errors.password}</p>
                    )}
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.confirmPassword && "border-red-500"
                        }`}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={e =>
                            setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic">
                            {errors.confirmPassword}
                        </p>
                    )}
                    <label className="flex items-center">
                        <input
                            className="form-checkbox h-5 w-5 text-blue-600"
                            type="checkbox"
                            name="agreement"
                            onChange={e =>
                                setFormData({ ...formData, agreement: e.target.checked })}
                        />
                        <span className="ml-2 text-gray-700">
                            I agree to the terms and conditions
                        </span>
                    </label>
                    {errors.agreement && (
                        <p className="text-red-500 text-xs italic">{errors.agreement}</p>
                    )}
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link href="/login">Already have an account? Log in</Link>
                </form>
            </div>
        </div>
    );
}
    