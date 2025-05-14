import Link from "next/link";
import Image from "next/image";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";
// import { getUserProgress } from "@/db/queries";

type Props = {
  className?: string;
};

// const teacherId = "user_2w7cDrenrlUgM6J6O3vCoZ9ydiX";

export const Sidebar = async ({ className }: Props) => {
  // const userProgressData = await getUserProgress();
  // const [userProgress] = await Promise.all([userProgressData]);

  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image alt="Mascot" src="/mascot.svg" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            ML
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Обучение" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Лидеры"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem
          label="Мессенджер"
          href="/messages"
          iconSrc="/message.svg"
        />
        <SidebarItem label="Друзья" href="/friends" iconSrc="/friends.svg" />
        <SidebarItem label="Задания" href="/quests" iconSrc="/quests.svg" />
        {/* {teacherId === userProgress?.userId && (
          <SidebarItem label="Уроки" href="/quests" iconSrc="/quests.svg" />
        )} */}
        <SidebarItem label="Магазин" href="/shop" iconSrc="/shop.svg" />
        <SidebarItem label="Профиль" href="/profile" iconSrc="/profile.svg" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
