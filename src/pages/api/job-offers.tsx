// pages/api/job-offers.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Not logged in" });
    }

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const {
        title,
        description
    }: { title: string; description: string } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const jobOffer = await prisma.jobOffer.create({
            data: {
                title,
                description,
                userId
            }
        });

        return res.status(200).json(jobOffer);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
}
