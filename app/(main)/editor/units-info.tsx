"use client";

import { Button } from "@/components/ui/button";
import { UnitBanner } from "./unit-banner";
import { useCreateUnitModal } from "@/store/use-create-unit-modal";

type Props = {
  units: {
    title: string;
    description: string;
    id: number;
    courseId: number;
    order: number;
    lessons: {
      title: string;
      id: number;
      order: number;
      unitId: number;
    }[];
    course: {
      title: string;
      id: number;
      imageSrc: string;
    };
  }[];
};

export const UnitsInfo = ({ units }: Props) => {
  const { open: openCreateUnitModal } = useCreateUnitModal();

  return (
    <div className="items-center mx-3">
      <div className="border-2 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center pt-3 text-neutral-800">
          <p className="text-2xl pl-2 font-bold text-blue-500">
            {units[0].course.title} язык
          </p>
          <Button variant="primary" onClick={() => openCreateUnitModal()}>
            Добавить раздел
          </Button>
        </div>
        <ul>
          {units.map((unit) => {
            return (
              <li key={unit.id} className="mb-2">
                <UnitBanner
                  title={unit.title}
                  description={unit.description}
                  lessons={unit.lessons}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
