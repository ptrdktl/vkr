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
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
// import { upsertUserFriends } from "@/actions/user-friends";
import { upsertRoom } from "@/actions/messages";

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

export function ProfileInfo({ name, id }: Props) {
  // const [isFriend, setIsFriend] = useState(false);

  const [pending, startTransition] = useTransition();

  // useEffect(() => {
  //   setIsFriend(userFriends?.find((user) => user?.userId === id) !== undefined);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // const handleDelete = () => {
  //   if (pending || !id) return;

  //   startTransition(() => {
  //     upsertUserFriends(id);
  //     setIsFriend(!isFriend);
  //   });
  //   console.log("delete");
  // };

  // const handleAdd = () => {
  //   if (pending || !id) return;

  //   startTransition(() => {
  //     upsertUserFriends(id);
  //     setIsFriend(!isFriend);
  //   });
  //   console.log("add");
  // };

  const handleMessage = () => {
    if (pending || !id) return;

    startTransition(() => {
      upsertRoom(id);
    });
    console.log("go to chat");
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
        {id && (
          <Button variant="secondary" onClick={handleMessage}>
            Написать
          </Button>
        )}
      </div>
      {/* <div className="flex justify-center mt-2">
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
          <Button onClick={handleAdd} variant="primaryOutline" className="py-4 px-7">
            Подписаться
          </Button>
        )}
      </div> */}
    </div>
  );
}
