import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: number }> }
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, (await params).challengeId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: number }> }
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, (await params).challengeId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: number }> }
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, (await params).challengeId))
    .returning();

  return NextResponse.json(data[0]);
};
