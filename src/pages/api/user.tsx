// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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

    try {
        const user = await prisma.$queryRaw`SELECT "id", "realName", "email" FROM "User" WHERE "id" = ${userId}`;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user[0]);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
}
