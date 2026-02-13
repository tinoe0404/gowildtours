import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyPassword, setSession } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        const user = await prisma.adminUser.findUnique({ where: { email } });

        if (!user || !user.isActive) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Update last login
        await prisma.adminUser.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Set session cookie
        await setSession({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
