"use client";

// import { usePathname } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCreateChallengeOptionModal } from "@/store/use-create-challenge-option-modal";
import { createNewChallengeOption } from "@/actions/editor";

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Название должно содержать хотя бы один символ.",
  }),
  correct: z
    .enum(["CORRECT", "INCORRECT"], {
      required_error: "Вам необходимо выбрать верен ли ответ",
    })
    .optional(),
  imageSrc: z.string().optional(),
  audioSrc: z.string().optional(),
});

export const CreateChallengeOptionModal = () => {
  const { isOpen, close } = useCreateChallengeOptionModal();
  const [pending, startTransition] = useTransition();

  // const pathname = usePathname();
  // const lessonId = pathname!.split("/").at(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (pending) return;

    startTransition(() => {
      createNewChallengeOption(
        82,
        values.question,
        values.correct!,
        values.imageSrc!,
        values.audioSrc!
      );
    });

    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">
            Вопрос
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Создайте новые вопросы в своих заданиях.
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
                        Ответ
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите вариант ответа"
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
                  name="correct"
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
                              CORRECT - правильный ответ
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ASSIST" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              INCORRECT - неправильный ответ
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageSrc"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                        Адресс изображения
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите адресс изображения"
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
                  name="audioSrc"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                        Адресс аудио файла
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите адресс аудио файла"
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
