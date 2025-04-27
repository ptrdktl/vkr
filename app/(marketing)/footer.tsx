import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2 ">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
          <Image
            src="/eng.svg"
            alt="English"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Английский
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/cz.svg"
            alt="Czech"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Чешский
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/sl.svg"
            alt="Slovak"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Словацкий
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/hr.svg"
            alt="Croation"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Хорватский
        </Button>
      </div>
    </footer>
  );
};
