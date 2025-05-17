"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeOptions, challenges, lessons, units } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createNewUnit = async (title: string, description?: string) => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!title) {
    throw new Error("No title");
  }

  if (!userProgress || !userProgress.activeCourseId) {
    throw new Error("No active course");
  }

  const currentUnits = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
  });

  await db.insert(units).values({
    title: title,
    description: description!,
    courseId: userProgress.activeCourseId!,
    order: currentUnits.length + 1,
  });

  revalidatePath("/editor");
};

export const updateLesson = async (
  lessonId: number,
  title: string,
  order?: number
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!lessonId || !title || !order) {
    throw new Error("No data");
  }

  await db
    .update(lessons)
    .set({
      title: title,
      order: order,
    })
    .where(eq(lessons.id, lessonId));

  console.log("lesson updated");
  revalidatePath(`/editor/${lessonId}?lessonId=${lessonId}`);
};

export const createNewChallenge = async (
  lessonId: number,
  qustion: string,
  type: "SELECT" | "ASSIST",
  order: number
) => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!qustion || !type || !order || !lessonId) {
    throw new Error("No data");
  }

  if (!userProgress || !userProgress.activeCourseId) {
    throw new Error("No active course");
  }

  await db.insert(challenges).values({
    lessonId: lessonId,
    question: qustion,
    type: type,
    order: order,
  });

  revalidatePath(`/editor/${lessonId}?lessonId=${lessonId}`);
};

export const updateChallengeOption = async (
  challengeId: number,
  text: string,
  correct: string,
  imageSrc: string,
  audioSrc: string,
  lessonId: number
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!challengeId || !text || !correct || !imageSrc || !audioSrc) {
    throw new Error("No data");
  }

  await db
    .update(challengeOptions)
    .set({
      challengeId: challengeId,
      text: text,
      correct: correct === "CORRECT" ? true : false,
      imageSrc: imageSrc,
      audioSrc: audioSrc,
    })
    .where(eq(challengeOptions.challengeId, challengeId));

  revalidatePath(`/editor/${lessonId}?lessonId=${lessonId}`);
};

export const createNewChallengeOption = async (
  challengeId: number,
  text: string,
  correct: string,
  imageSrc: string,
  audioSrc: string
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.insert(challengeOptions).values({
    challengeId: challengeId,
    text: text,
    correct: correct === "CORRECT" ? true : false,
    imageSrc: imageSrc,
    audioSrc: audioSrc,
  });
};
