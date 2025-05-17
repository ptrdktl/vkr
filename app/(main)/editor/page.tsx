import { getUnitsForEditor } from "@/db/queries";
import { UnitsInfo } from "./units-info";

const EditorPage = async () => {
  const unitsData = getUnitsForEditor();

  const [units] = await Promise.all([unitsData]);

  return <UnitsInfo units={units} />;
};

export default EditorPage;
