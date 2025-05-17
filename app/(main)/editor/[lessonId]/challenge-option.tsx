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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTransition } from "react";
import { updateChallengeOption } from "@/actions/editor";

type Props = {
  challengeOption: {
    id: number;
    imageSrc: string | null;
    challengeId: number;
    text: string;
    correct: boolean;
    audioSrc: string | null;
  };
  lessonId: number;
};

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

export const ChallengeOption = ({ challengeOption, lessonId }: Props) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (pending) return;

    if (!values.correct) {
      values.correct = challengeOption.correct ? "CORRECT" : "INCORRECT";
    }

    if (!values.imageSrc) {
      values.imageSrc = challengeOption.imageSrc!;
    }

    if (!values.audioSrc) {
      values.audioSrc = challengeOption.audioSrc!;
    }

    console.log(values);

    startTransition(() => {
      updateChallengeOption(
        challengeOption.challengeId,
        values.question,
        values.correct!,
        values.imageSrc!,
        values.audioSrc!,
        lessonId
      );
    });
  }

  function onReset(values: z.infer<typeof formSchema>) {
    console.log(values);
    // if (pending) return;

    // if (!values.order) {
    //   // values.order = lesson!.id.toString();
    // }

    // startTransition(() => {
    //   // updateLesson(lesson!.id, values.title, parseInt(values.order!));
    // });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={form.handleSubmit(onReset)}
      >
        <div className="border-2 rounded-xl p-4 space-y-4 mt-1">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="space-y-1 flex gap-0 flex-col bg-orange-400 px-4 py-2 rounded-lg text-white font-semibold">
                <FormLabel className="px-2 text-[15px]">Вопрос</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите вопрос"
                    min={1}
                    defaultValue={challengeOption!.text}
                    className="p-2 border-2 rounded-md border-neutral-100 lg:text-[15px]"
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
              <FormItem className="space-y-1 flex gap-0 flex-col bg-orange-400 px-4 py-2 rounded-lg text-white font-semibold">
                <FormLabel className="px-2 text-[15px]">
                  Верен ли ответ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={
                      challengeOption.correct ? "CORRECT" : "INCORRECT"
                    }
                    className="flex flex-col space-y-1 p-3 pt-1 gap-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="CORRECT" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Correct - правльный ответ
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="INCORRECT" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Incorrect - неправильный ответ
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
              <FormItem className="space-y-1 flex gap-0 flex-col bg-orange-400 px-4 py-2 rounded-lg text-white font-semibold">
                <FormLabel className="px-2 text-[15px]">
                  Адрес изображения
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите адресс изображения"
                    min={1}
                    defaultValue={challengeOption.imageSrc!}
                    className="p-2 border-2 rounded-md border-neutral-100 lg:text-[15px]"
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
              <FormItem className="space-y-1 flex gap-0 flex-col bg-orange-400 px-4 py-2 rounded-lg text-white font-semibold">
                <FormLabel className="px-2 text-[15px]">
                  Адрес аудио файла
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите адрес аудио файла"
                    min={1}
                    defaultValue={challengeOption!.audioSrc! ?? null}
                    className="p-2 border-2 rounded-md border-neutral-100 lg:text-[15px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center mt-3 gap-2">
            <Button size="lg" variant="secondary" type="submit">
              Сохранить
            </Button>
            <Button size="lg" variant="dangerOutline" type="reset">
              Удалить
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
