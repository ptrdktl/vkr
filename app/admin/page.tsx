import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

//заменил ssr: false на !!false и все заработало
const App = dynamic(() => import("./app"), { ssr: !!false });
const AdminPage = async () => {
  if (!(await isAdmin())) {
    redirect("/");
  }

  return <App />;
};

export default AdminPage;
