import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TEACHER_ID } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  otherUsers: {
    userId: string;
    userName: string;
    userImageSrc: string;
    hearts: number;
    points: number;
  }[];
};

export const UsersList = ({ otherUsers }: Props) => {
  return (
    <ul>
      {otherUsers
        .filter((user) => {
          return user.userId !== TEACHER_ID;
        })
        .map((user) => {
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
                      <h3 className="font-bold text-[18px]">{user.points}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
