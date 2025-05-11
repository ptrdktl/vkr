"use clietnt";

import ProfilePage from "../page";
import { FeedWrapper } from "@/components/feed-wrapper";

const ProfileIdPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
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
