"use client";

import { Button } from "@/components/ui/button";
import { useCreateChallengeModal } from "@/store/use-create-challenge-modal";
import { ChallengeInfo } from "./challenge-info";

type Props = {
  challenges:
    | {
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
      }[];
};

export const Challenges = ({ challenges }: Props) => {
  // const [pending, startTransition] = useTransition();

  const { open: openCreateChallengeModal } = useCreateChallengeModal();

  return (
    <div className="border-2 rounded-xl p-4 space-y-4 mt-3">
      <div className="flex justify-end items-center">
        <Button variant="primary" onClick={() => openCreateChallengeModal()}>
          Добавить задание
        </Button>
      </div>
      <div className="flex justify-between items-center pt-1 text-neutral-800">
        <ul className="w-full">
          {challenges.map((challenge) => {
            return (
              <li key={challenge.id} className="mb-2">
                <ChallengeInfo challenge={challenge} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
