import Image from "next/image";
import Confetti from "react-confetti";
import { ResultCard } from "./result-card";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import { useAudio, useWindowSize } from "react-use";
import { challengeOptions, challenges } from "@/db/schema";

type Props = {
  challenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  hearts: number;
  lessonId: number;
};

//перенес в новый компонент
export const FinishScreen = ({ challenges, hearts, lessonId }: Props) => {
  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });

  return (
    <>
      {finishAudio}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <Image
          src="/finish.svg"
          alt="Finish"
          className="hidden lg:block"
          width={100}
          height={100}
        />
        <Image
          src="/finish.svg"
          alt="Finish"
          className="block lg:hidden"
          width={50}
          height={50}
        />
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Отлично! <br /> Вы прошли урок.
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={challenges.length * 10} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => router.push("/learn")}
      />
    </>
  );
};
