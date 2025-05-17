"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { UsersList } from "./users-list";
import { FriendsList } from "./friends-list";
import { TEACHER_ID } from "@/constants";

type Props = {
  userId?: string;
  otherUsers: {
    data: {
      userId: string;
      userName: string;
      userImageSrc: string;
      hearts: number;
      points: number;
    }[];
    userFriends: (
      | {
          userId: string;
          userName: string;
          userImageSrc: string;
          hearts: number;
          points: number;
        }
      | undefined
    )[];
  } | null;
};

export const List = ({ otherUsers, userId }: Props) => {
  const [isFriendsActive, setIsFriendsActive] = useState(false);

  const isTeacher = TEACHER_ID === userId;

  return (
    <div className="w-full flex-1 flex-col items-center">
      <div className="border-2 rounded-xl p-4 space-y-4">
        <div className="flex gap-2 p-2">
          {isTeacher ? (
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
          ) : (
            <>
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
                Учитель
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
            </>
          )}
        </div>
        <div className="space-y-2 mt-5">
          {isFriendsActive ? (
            <FriendsList userFriends={otherUsers!.userFriends} />
          ) : (
            <UsersList otherUsers={otherUsers!.data} />
          )}

          <div className="flex items-center gap-x-2 justify-center"></div>
        </div>
      </div>
    </div>
  );
};
