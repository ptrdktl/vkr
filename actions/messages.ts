"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { getRoom } from "@/db/queries";
import { messages, rooms } from "@/db/schema";
import { redirect } from "next/navigation";

export const upsertRoom = async (otherUserId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  let roomId = await getRoom(otherUserId);

  if (!roomId) {
    await db.insert(rooms).values({
      firstUserId: userId,
      secondUserId: otherUserId,
    });
    roomId = await getRoom(otherUserId);
  }

  console.log(roomId!.id);
  redirect(`/messages/${roomId!.id}?roomId=${roomId!.id}`);
};

export const createMessage = async (roomId: number, value: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db.insert(messages).values({
    roomId: roomId,
    senderUserId: userId,
    senderUserImageSrc: user.imageUrl,
    senderUserName: user.firstName || "User",
    value: value,
  });
};
