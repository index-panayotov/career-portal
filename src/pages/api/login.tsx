// pages/api/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();
type ResponseData = {
    message?: string,
    error?: string,
  }
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { email, password } = req.body;

    // Validate the email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validate the password.
    if (password.length < 5 || password.length > 64) {
        return res.status(400).json({ error: 'Password must be between 5 and 64 characters.' });
    }

    // Check if a user with the given email exists.
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(400).json({ error: 'No user found with this email.' });
    }

    // Check if the password is correct.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Incorrect password.' });
    }

    // Generate a JWT token.
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie.
    res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
    }));

    res.status(200).json({ status: 'success' });
}