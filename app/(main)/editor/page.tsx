import { getUnitsForEditor } from "@/db/queries";
import { UnitsInfo } from "./units-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редактор",
  description: "Редактор уроков.",
};

const EditorPage = async () => {
  const unitsData = getUnitsForEditor();

  const [units] = await Promise.all([unitsData]);

  return <UnitsInfo units={units} />;
};

export default EditorPage;
