"use client";

import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { useCreateChallengeModal } from "@/store/use-create-challenge-modal";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createNewChallenge } from "@/actions/editor";
import { Input } from "../ui/input";

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Название должно содержать хотя бы один символ.",
  }),
  type: z.enum(["SELECT", "ASSIST"], {
    required_error: "Вам необходимо выбрать тип задания.",
  }),
  order: z.string().optional(),
});

export const CreateChallengeModal = () => {
  const { isOpen, close } = useCreateChallengeModal();
  const [pending, startTransition] = useTransition();

  const pathname = usePathname();
  const lessonId = pathname!.split("/").at(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (pending) return;

    startTransition(() => {
      createNewChallenge(
        parseInt(lessonId!),
        values.question,
        values.type,
        parseInt(values.order!)
      );
    });

    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">
            Новое задание
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Создайте новые задания в своих уроках.
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
                  name="question"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                        Вопрос
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Как переводится слово 'man' ?"
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-700 ml-1.5">
                        Тип задания
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="SELECT" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Select - выбор из предложенных вариантов ответа с
                              картиной
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ASSIST" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Assist - ответить на вопрос
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-700 ml-1.5">
                        Очередность задания
                      </FormLabel>
                      <Input
                        type="number"
                        placeholder="Введите очередность задания"
                        min={1}
                        className="p-2 border-2 rounded-md border-neutral-100 lg:text-[15px] placeholder:text-neutral-500"
                        {...field}
                      />
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
