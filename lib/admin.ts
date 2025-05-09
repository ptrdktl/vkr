import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2w7cDrenrlUgM6J6O3vCoZ9ydiX"];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  } 

  return adminIds.indexOf(userId) !== -1;
};
