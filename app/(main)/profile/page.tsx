import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { ProfileInfo } from "@/components/profile-info";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  id?: string;
};

const ProfilePage = async ({ id }: Props) => {
  const userProgressData = id ? getUserProgress(id) : getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
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
        {id && (
          <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
            <Link href="/friends">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
              </Button>
            </Link>
            <div />
          </div>
        )}
        <div className="w-full flex-1 flex-col items-center">
          <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <Image src="/profile.svg" alt="Pro" height={26} width={26} />
                <h3 className="font-bold text-lg">Профиль</h3>
              </div>
              <p className="text-muted-foreground">
                Узнайте информацию о пользователе
              </p>
              <Separator className="mb-4 h-0.5 rounded-full" />
            </div>

            <div className="space-y-2 mt-12">
              <div className="flex items-center gap-x-2 justify-center">
                <Avatar className="size-40">
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                  />
                </Avatar>
              </div>
              <p className="flex text-muted-foreground mt-7 justify-center items-center">
                Обзор
              </p>
              <div className="flex gap-2 items-center justify-center">
                <div className="border-2 rounded-xl p-4 space-y-4">
                  <div className="space-y-2 w-35">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/heart.svg"
                        alt="Pro"
                        height={26}
                        width={26}
                      />
                      <h3 className="font-bold text-lg">
                        {userProgress.hearts}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Количество жизней
                    </p>
                  </div>
                </div>
                <div className="border-2 rounded-xl p-4 space-y-4">
                  <div className="space-y-2 w-35">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/points.svg"
                        alt="Pro"
                        height={26}
                        width={26}
                      />
                      <h3 className="font-bold text-lg">
                        {userProgress.points}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mx-auto">
                      Очки опыта
                    </p>
                  </div>
                </div>
              </div>
              <ProfileInfo name={userProgress?.userName ?? ""} />
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
