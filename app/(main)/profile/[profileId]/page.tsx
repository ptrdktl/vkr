"use clietnt";

import type { Metadata } from "next";
import ProfilePage from "../page";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";

type Props = {
  searchParams: Promise<{ id: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const { id } = await searchParams;

  const userProgressData = await getUserProgress(id);

  return {
    title: userProgressData?.userName,
  };
}

const ProfileIdPage = async ({ searchParams }: Props) => {
  const userId = (await searchParams).id;

  return (
    <>
      <FeedWrapper>
        <ProfilePage id={userId} />
      </FeedWrapper>
    </>
  );
};

export default ProfileIdPage;
