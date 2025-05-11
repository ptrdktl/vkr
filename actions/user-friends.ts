"use server";

import db from "@/db/drizzle";
import { follows } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const upsertUserFriends = async (friendId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const friendsPair = await db.query.follows.findFirst({
    where: and(
      eq(follows.followerUserId, userId),
      eq(follows.followingUserId, friendId)
    ),
  });

  console.log(friendsPair);
  if (friendsPair) {
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerUserId, userId),
          eq(follows.followingUserId, friendId)
        )
      );
    return;
  }

  await db.insert(follows).values({
    followerUserId: userId,
    followingUserId: friendId,
  });
};
