"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateUnitModal } from "@/store/use-create-unit-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createNewUnit } from "@/actions/editor";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Название должно содержать хотя бы один символ.",
  }),
  description: z.string().optional(),
});

export const CreateUnitModal = () => {
  const { isOpen, close } = useCreateUnitModal();
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(() => {
      if (pending) return;

      createNewUnit(values.title, values.description);
    });
    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">
            Новый раздел
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Создайте новые разделы для своих уроков.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                        Название
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите название раздела"
                          className="resize-none w-full placeholder:text-neutral-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-700 ml-1.5">
                        Описание
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите описание раздела"
                          className="resize-none w-full placeholder:text-neutral-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button variant="secondary" type="submit">
                    Добавить
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
