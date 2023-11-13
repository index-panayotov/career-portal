// pages/api/checklogin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is valid, return the user's data
        return res.status(200).json({ user: decoded });
    } catch (error) {
        // If the token is invalid, return a 401 status code
        return res.status(401).json({ message: 'Not logged in' });
    }
}