// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    /// {"email":"admin@admin.com","realName":"asdasdasdasd","password":"123456789","confirmPassword":"123456789","agreement":true}
    const {
        email,
        realName,
        password,
        confirmPassword,
        agreement
    }: {
        email: string;
        realName: string;
        password: string;
        confirmPassword: string;
        agreement: boolean;
    } = req.body;

    if (!email || !realName || !password || !confirmPassword || !agreement) {
        return res
            .status(400)
            .json({ message: "Missing fields", data: req.body });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.$executeRaw`INSERT INTO "User" (email, "realName", password) VALUES (${email},  ${realName}, ${hashedPassword})`;

        const user = await prisma.$queryRaw`SELECT id, email, "realName" FROM "User" WHERE email = ${email}`;

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 3600,
                path: "/"
            })
        );

        return res.status(200).json(user[0]);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
}
