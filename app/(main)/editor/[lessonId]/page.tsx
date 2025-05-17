import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getChallengesForEditor, getLessonForEditor } from "@/db/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GeneralInfo } from "./general-info";
import { Challenges } from "./challenges";

const LessonEditorIdPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ lessonId: number }>;
}) => {
  const [params] = await Promise.all([searchParams]);
  const [lessonId] = [params.lessonId];

  const lessonData = getLessonForEditor(lessonId);
  const challengesData = getChallengesForEditor(lessonId);
  const [lesson, challenges] = await Promise.all([lessonData, challengesData]);

  return (
    <div className="flex-col justify-center items-center p-3">
      <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
        <Link href="/editor">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>
        <div />
      </div>

      <Tabs defaultValue="account" className="lg:w-[800px] sm:w-[600]">
        <TabsList className="grid w-full grid-cols-2 self-center">
          <TabsTrigger className="text-white p-1.5 text-lg" value="account">
            Общие сведения
          </TabsTrigger>
          <TabsTrigger className="text-white p-1.5 text-lg" value="password">
            Упражнения
          </TabsTrigger>
          {/* <TabsTrigger className="text-white p-1.5 text-lg" value="statistic">
            Статистика учеников
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <GeneralInfo lesson={lesson} />
        </TabsContent>
        <TabsContent value="password">
          <Challenges challenges={challenges || []} />
        </TabsContent>
        <TabsContent value="statistic">
          <div className="border-2 rounded-xl p-4 space-y-4 mt-3">
            <div className="flex justify-between items-center pt-3 text-neutral-800">
              {"Статистика учеников)"}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonEditorIdPage;
