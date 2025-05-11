"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 10 characters.",
    })
    .max(160, {
      message: "Name must not be longer than 30 characters.",
    }),
  // password: z
  //   .string()
  //   .min(10, {
  //     message: "Password must be at least 10 characters.",
  //   })
  //   .max(160, {
  //     message: "Password must not be longer than 30 characters.",
  //   }),
});

type Props = {
  name: string;
};

export function ProfileInfo({ name }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                Имя пользователя
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите имя пользователя"
                  className="resize-none w-full font-bold"
                  {...field}
                  value={name}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 ml-1.5 mt-3">
                Пароль
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите пароль"
                  className="resize-none"
                  {...field}
                  value={password}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
}
