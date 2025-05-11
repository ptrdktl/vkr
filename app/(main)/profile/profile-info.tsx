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
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { upsertUserFriends } from "@/actions/user-friends";

const FormSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 10 characters.",
    })
    .max(160, {
      message: "Name must not be longer than 30 characters.",
    }),
});

type Props = {
  name: string;
  id?: string;
  userFriends:
    | (
        | {
            userId: string;
            userName: string;
            userImageSrc: string;
            hearts: number;
            points: number;
          }
        | undefined
      )[]
    | undefined;
};

export function ProfileInfo({ name, id, userFriends }: Props) {
  const [isFriend, setIsFriend] = useState(false);

  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setIsFriend(userFriends?.find((user) => user?.userId === id) !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleDelete = () => {
    if (pending || !id) return;

    startTransition(() => {
      upsertUserFriends(id);
      setIsFriend(!isFriend);
    });
    console.log("delete");
  };

  const handleAdd = () => {
    if (pending || !id) return;

    startTransition(() => {
      upsertUserFriends(id);
      setIsFriend(!isFriend);
    });
    console.log("add");
  };

  return (
    <div>
      <Form {...form}>
        <form className="w-full space-y-6">
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
        </form>
      </Form>
      <div className="flex justify-center mt-7">
        {id && isFriend && (
          <Button
            onClick={handleDelete}
            variant="dangerOutline"
            className="py-4 px-7"
          >
            Удалить из друзей
          </Button>
        )}
        {id && !isFriend && (
          <Button onClick={handleAdd} variant="primary" className="py-4 px-7">
            Подписаться
          </Button>
        )}
      </div>
    </div>
  );
}
