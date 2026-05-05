import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum userRole {
    user = "USER",
    seller = "SELLER", // টাইপো ঠিক করা হয়েছে (seler -> seller)
    admin = "ADMIN"
}
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        image: string;
    };
}

const auth = (...roles: userRole[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers
            });

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access. Please login."
                });
            }

            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image as string,
                role: session.user.role as string,
                status: session.user.status as string
            };

            if (roles.length && !roles.includes(req.user.role as userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You don't have enough permission"
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

export default auth;