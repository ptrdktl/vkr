"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user?: string;
  otherUsers: {
    userId: string;
    userName: string;
    userImageSrc: string;
    hearts: number;
    points: number;
  }[];
};

export const FriendsList = ({ otherUsers }: Props) => {
  const [isFriendsActive, setIsFriendsActive] = useState(true);

  return (
    <div className="w-full flex-1 flex-col items-center">
      <div className="border-2 rounded-xl p-4 space-y-4">
        <div className="flex gap-2 p-2">
          <p
            onClick={() =>
              !isFriendsActive && setIsFriendsActive(!isFriendsActive)
            }
            className={cn(
              "font-bold text-xl rounded-xl inline-flex p-2 px-4 cursor-pointer",
              isFriendsActive
                ? "text-white bg-indigo-600"
                : "text-neutral-700 bg-neutral-200"
            )}
          >
            Друзья
          </p>
          <p
            onClick={() =>
              isFriendsActive && setIsFriendsActive(!isFriendsActive)
            }
            className={cn(
              "font-bold text-xl rounded-xl inline-flex p-2 px-4 cursor-pointer",
              isFriendsActive
                ? "text-neutral-700 bg-neutral-200"
                : "text-white bg-indigo-600"
            )}
          >
            Все ученики
          </p>
        </div>
        <div className="space-y-2 mt-5">
          {isFriendsActive ? null : (
            <ul>
              {otherUsers.map((user) => {
                return (
                  <li
                    key={user.userId}
                    className="hover:bg-gray-200/50 w-full p-2 px-3 rounded-xl"
                  >
                    <Link
                      href={{
                        pathname: `/profile/${user.userId}`,
                        query: { id: user.userId },
                      }}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                            <AvatarImage
                              className="object-cover"
                              src={user.userImageSrc}
                            />
                          </Avatar>
                          <p className="text-neutral-800 font-bold text-[18px]">
                            {user.userName}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center gap-x-2">
                            <Image
                              src="/points.svg"
                              alt="Pro"
                              height={26}
                              width={26}
                            />
                            <h3 className="font-bold text-[18px]">
                              {user.points}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex items-center gap-x-2 justify-center"></div>
        </div>
      </div>
    </div>
  );
};
