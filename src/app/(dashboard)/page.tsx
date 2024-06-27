import { Dashboard } from "@/components/dashboard";
import { getData, getDataWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { StatisticType } from "@/types";

export default async function Home() {
  const session = await getSession();
  const statistic: StatisticType = await getDataWithToken(
    "statistic",
    session.user.token
  );

  return <Dashboard statistic={statistic} />;
}
