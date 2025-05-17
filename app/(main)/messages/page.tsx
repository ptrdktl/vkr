import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import {
  getUserProgress,
  getUserRooms,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const MessagesPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const userRoomsData = getUserRooms();

  const [userProgress, userSubscription, userRooms] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    userRoomsData,
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
        <div className="w-full flex-1 flex-col items-center">
          <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-x-3">
                <Image
                  src="/message.svg"
                  alt="Message"
                  height={26}
                  width={26}
                />
                <h3 className="font-bold text-lg">Чаты</h3>
              </div>
              <p className="text-muted-foreground">
                Узнайте информацию о пользователе
              </p>
              <input
                type="text"
                // value={keywords}
                // onChange={(e) => setKeywords(e.target.value)}
                className="flex w-full bg-neutral-200 py-1 px-2 border-1 rounded-md"
                placeholder="Введите имя"
              />
              <Separator className="mb-4 mt-3 h-0.5 rounded-full" />
            </div>
            <div className="space-y-2 mt-5"></div>
            <ul>
              {userRooms?.map(async (room) => (
                <li key={(await room).id} className="mb-2">
                  {
                    <Link
                      href={{
                        pathname: `/messages/${(await room).id}`,
                        query: { roomId: (await room).id },
                      }}
                    >
                      <div className="flex items-center hover:bg-gray-200/50 w-full p-2 px-3 rounded-xl">
                        <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                          <AvatarImage
                            className="object-cover"
                            src={
                              (await room).secondUserImageSrc ===
                              userProgress.userImageSrc
                                ? (await room).firstUserImageSrc
                                : (await room).secondUserImageSrc
                            }
                          />
                        </Avatar>
                        <p className="text-neutral-800 font-bold text-[18px]">
                          {(await room).secondUserName === userProgress.userName
                            ? (await room).firstUserName
                            : (await room).secondUserName}
                        </p>
                      </div>
                    </Link>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default MessagesPage;
