"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  lessons: {
    title: string;
    id: number;
    order: number;
    unitId: number;
  }[];
};

export const UnitBanner = ({ title, description, lessons }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="w-full rounded-xl bg-orange-400  p-5 text-white flex items-center justify-between">
        <div className="flex justify-between w-full items-center">
          <div>
            {/* <Link
              href={{
                pathname: `/editor/1`,
                query: { lessonId: 1 },
              }}
            >
            </Link> */}
              <h3 className="text-2xl font-bold hover:underline">{title}</h3>
            <p className="text-lg">{description}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="dropDown"
              className="p-0 hover:text-red-600"
            >
              <Trash2 className="size-7" />
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
        <div className="rounded-xl p-4 pb-0 text-black">
          <div className="w-full flex items-center justify-center text-xl font-bold text-neutral-700 underline">
            Названия уроков
          </div>
          <ul className="rounded-xl p-3 pt-1 flex flex-col">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="hover:bg-neutral-100 flex justify-between rounded-xl p-1.5 px-2 items-center"
              >
                <Link
                  href={{
                    pathname: `/editor/${lesson.id}`,
                    query: { lessonId: lesson.id },
                  }}
                >
                  <p className="text-lg font-bold text-neutral-700 cursor-pointer hover:underline flex gap-2">
                    {lesson.order} {lesson.title}
                  </p>
                </Link>
                <Button
                  variant="dropDown"
                  className="p-0 text-red-300 hover:text-red-600"
                >
                  <Trash2 className="size-6" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
