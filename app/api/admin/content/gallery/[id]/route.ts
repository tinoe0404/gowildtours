import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession, hasPermission } from "@/lib/admin/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const item = await prisma.galleryImage.findUnique({
        where: { id },
    });

    if (!item) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "content:manage")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const data = await req.json();

    const item = await prisma.galleryImage.update({
        where: { id },
        data,
    });

    return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "content:manage")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.galleryImage.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}
