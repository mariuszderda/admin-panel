import { Dashboard } from "@/components/dashboard";
import { getData, getDataWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { StatisticType } from "@/types";

export default async function Home() {
  const session = await getSession();

  return <Dashboard token={session.user.token} />;
}
