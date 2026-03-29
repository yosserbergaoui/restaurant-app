import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const plats = await prisma.plat.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
        available: true,
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(plats);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const plat = await prisma.plat.create({
      data: body,
      include: { category: true },
    });

    return NextResponse.json(plat, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}