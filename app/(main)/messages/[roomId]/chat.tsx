"use client";

import { createMessage } from "@/actions/messages";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChangeEvent, useState, useTransition } from "react";

type Props = {
  roomId: number;
  messages:
    | {
        id: number;
        senderUserId: string;
        senderUserName: string;
        senderUserImageSrc: string;
        value: string;
        createdAt: Date;
      }[]
    | null;
  userId: string;
  userImageSrc: string;
  userName: string;
};

export const Chat = ({
  roomId,
  messages,
  userId,
  userImageSrc,
  userName,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState("");

  if (!messages || !userId) {
    return null;
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const onCreate = () => {
    if (pending) return;

    startTransition(() => {
      createMessage(roomId, value);
      messages.push({
        id: messages.length - 1,
        senderUserId: userId,
        senderUserName: userName,
        senderUserImageSrc: userImageSrc,
        value: value,
        createdAt: new Date(),
      });

      setValue("");
    });
  };
  return (
    <div className="items-center mx-3">
      <div className="border-2 rounded-xl p-4 space-y-4">
        <ul>
          {messages.map((message, i) => (
            <li key={i}>
              <div
                className={cn(
                  "flex hover:bg-gray-200/50 w-full p-1 px-2 rounded-xl justify-between"
                  // message.senderUserId === userId && "flex-row-reverse"
                )}
              >
                <div className="flex items-center">
                  <Link
                    href={
                      message.senderUserId === userId
                        ? {
                            pathname: `/profile`,
                          }
                        : {
                            pathname: `/profile/${message!.senderUserId}`,
                            query: { id: message!.senderUserId },
                          }
                    }
                  >
                    <Avatar className="border bg-green-500 h-12 w-12 ml-1 mr-3">
                      <AvatarImage
                        className="object-cover"
                        src={message.senderUserImageSrc}
                      />
                    </Avatar>
                  </Link>
                  <div className="flex-col">
                    <p className="text-blue-600 text-[18px] font-bold">
                      {message.senderUserName}
                    </p>
                    <p className="text-neutral-800 text-[17px] font-semibold break-all mr-6">
                      {message.value}
                    </p>
                  </div>
                </div>
                <p className="text-[15px] text-muted-foreground min-w-[60px] mt-2">
                  {message.createdAt.toLocaleTimeString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            className="flex w-full bg-neutral-200 py-1 px-2 border-1 rounded-md"
            placeholder="Сообщение"
          />
          <Button variant="secondary" onClick={onCreate}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};
