import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "gowild-admin-secret-change-in-production";
const COOKIE_NAME = "gwt_admin_token";

export type AdminSession = {
    id: string;
    email: string;
    name: string;
    role: string;
};

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export function signToken(payload: AdminSession): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): AdminSession | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AdminSession;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<AdminSession | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function setSession(session: AdminSession) {
    const token = signToken(session);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    });
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

// ── RBAC ──

type Permission =
    | "dashboard:view"
    | "inquiries:manage"
    | "bookings:manage"
    | "content:manage"
    | "reviews:moderate"
    | "analytics:view"
    | "reports:export"
    | "campaigns:send"
    | "settings:manage"
    | "users:manage";

const rolePermissions: Record<string, Permission[]> = {
    super_admin: [
        "dashboard:view", "inquiries:manage", "bookings:manage", "content:manage",
        "reviews:moderate", "analytics:view", "reports:export", "campaigns:send",
        "settings:manage", "users:manage",
    ],
    admin: [
        "dashboard:view", "inquiries:manage", "bookings:manage", "content:manage",
        "reviews:moderate", "analytics:view", "reports:export", "campaigns:send",
    ],
    manager: [
        "dashboard:view", "inquiries:manage", "bookings:manage", "content:manage",
        "reviews:moderate", "analytics:view",
    ],
    staff: [
        "dashboard:view", "inquiries:manage",
    ],
};

export function hasPermission(role: string, permission: Permission): boolean {
    return rolePermissions[role]?.includes(permission) ?? false;
}
