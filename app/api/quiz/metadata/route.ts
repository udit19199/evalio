import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        topics: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quiz metadata" }, { status: 500 });
  }
}
