"use client";

import { updateLesson } from "@/actions/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  lesson:
    | {
        title: string;
        order: number;
        id: number;
        unitId: number;
      }
    | undefined;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Название должно содержать хотя бы один символ.",
  }),
  order: z.string().optional(),
});

export const GeneralInfo = ({ lesson }: Props) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (pending) return;

    if (!values.order) {
      values.order = lesson!.id.toString();
    }

    startTransition(() => {
      updateLesson(lesson!.id, values.title, parseInt(values.order!));
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="border-2 rounded-xl p-4 space-y-4 mt-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-col bg-orange-400 px-4 py-3 rounded-lg text-white font-semibold">
                  <FormLabel className="px-2 text-[18px]">Название</FormLabel>
                  <FormControl>
                    <Textarea
                      defaultValue={lesson!.title}
                      placeholder="Введите название урока"
                      className="p-2 border-2 rounded-md border-neutral-100 lg:text-[18px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem className="space-y-1 flex flex-col bg-orange-400 px-4 py-3 rounded-lg text-white font-semibold">
                  <FormLabel className="px-2 text-[18px]">
                    Очередь урока
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Введите очередь урока"
                      min={1}
                      defaultValue={lesson!.order}
                      className="p-2 border-2 rounded-md border-neutral-100 lg:text-[18px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center mt-3">
            <Button size="lg" variant="secondary" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
