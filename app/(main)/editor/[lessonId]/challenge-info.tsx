"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ChallengeOption } from "./challenge-option";
// import { useCreateChallengeOptionModal } from "@/store/use-create-challenge-option-modal";

type Props = {
  challenge: {
    id: number;
    order: number;
    lessonId: number;
    type: "SELECT" | "ASSIST";
    question: string;
    challengeOptions: {
      id: number;
      imageSrc: string | null;
      challengeId: number;
      text: string;
      correct: boolean;
      audioSrc: string | null;
    }[];
  };
};

export const ChallengeInfo = ({ challenge }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // const { open: openCreateChallengeModal } = useCreateChallengeOptionModal();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="w-full rounded-xl bg-orange-400  p-5 text-white flex items-center justify-between">
        <div className="flex justify-between w-full items-center">
          <div>
            <Link
              href={{
                pathname: `/editor/1`,
                query: { lessonId: 1 },
              }}
            >
              <h3 className="text-2xl font-bold hover:underline">
                {challenge.question}
              </h3>
            </Link>
            <p className="text-lg">{challenge.type}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="dropDown" className="p-0 hover:text-red-600">
              <Trash2 className="size-7" />
            </Button>
            <Button
              // onClick={() => openCreateChallengeModal()} // пока убрал, т.к. не доделал
              variant="dropDown"
              className={cn("p-0 hover:text-blue-500")}
            >
              <Plus className="size-8 rotate-2" />
            </Button>
            <Button
              onClick={toggle}
              variant="dropDown"
              className={cn(
                "p-0 hover:text-white",
                isOpen && "rotate-180 text-white"
              )}
            >
              <ArrowDown className="size-8 rotate-2" />
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ul>
          {challenge.challengeOptions.map((challengeOption) => {
            return (
              <li key={challengeOption.id} className="mb-2">
                <ChallengeOption
                  challengeOption={challengeOption}
                  lessonId={challenge.lessonId}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
