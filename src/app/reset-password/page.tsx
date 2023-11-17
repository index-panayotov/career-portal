"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            router.push("/login");
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white rounded shadow-md"
            >
                <label className="block mb-2">
                    <span className="text-gray-700">Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>

                <label className="block mb-2">
                    <span className="text-gray-700">New Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            {errorMessage &&
                <div className="fixed bottom-0 left-0 m-4 p-2 bg-red-600 text-white rounded">
                    {errorMessage}
                </div>}
        </div>
    );
}
