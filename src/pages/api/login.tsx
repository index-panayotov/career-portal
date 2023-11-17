import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return false;
    }
    const { email, password } = req.body;

    // Find the user in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        res.status(401).json({ error: "Invalid login credentials" });
        return;
    }

    // Check if the password is correct
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        res.status(401).json({ error: "Invalid login credentials" });
        return;
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    // Send the token to the client
    res.status(200).json({ token });
}
