import { getMessages, getUserProgress } from "@/db/queries";
import { Chat } from "./chat";

const RoomIdPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: number }>;
}) => {
  const roomId = (await searchParams).roomId;

  const messagesData = getMessages(roomId);
  const userProgressData = getUserProgress();

  const [messages, userProgress] = await Promise.all([
    messagesData,
    userProgressData,
  ]);

  return (
    <div>
      <Chat
        roomId={roomId}
        messages={messages}
        userId={userProgress!.userId}
        userImageSrc={userProgress!.userImageSrc}
        userName={userProgress!.userName}
      />
    </div>
  );
};

export default RoomIdPage;
