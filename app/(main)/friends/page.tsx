import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { currentUser } from "@clerk/nextjs/server";
import { List } from "./list";

const FriendsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const otherUsersData = getUsers();

  const user = await currentUser();

  const [userProgress, userSubscription, otherUsers] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    otherUsersData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <List userId={user?.id} otherUsers={otherUsers! ?? []} />
      </FeedWrapper>
    </div>
  );
};

export default FriendsPage;
