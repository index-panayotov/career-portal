"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import react-quill to avoid issues with server-side rendering
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

export default function JobOfferForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await fetch("/api/job-offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </label>

            <label>
                Description:
                <QuillNoSSRWrapper
                    value={description}
                    onChange={setDescription}
                />
            </label>

            <button type="submit">Create Job Offer</button>
        </form>
    );
}
