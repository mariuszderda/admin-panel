import { ActionButtons } from "@/components/action-buttons";
import { PageCard } from "@/components/page-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { DeliveryType } from "@/types";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const DeliveryPage = async () => {
  const deliveries = await getData("delivery");
  const session = await getSession();

  return (
    <PageCard
      title="Payments"
      subtitle="Create and edit delivery method."
      createHref="/delivery/create"
    >
      <Table>
        <TableCaption>A list of all delivery methods. </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery: DeliveryType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/delivery/${delivery._id}`,
              }}
              key={delivery._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {delivery._id.slice(-6)}
                </TableCell>
                <TableCell>{delivery.display_name}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell className="text-right flex justify-end items-center w-auto">
                  <ActionButtons
                    elementId={delivery._id}
                    token={session?.user?.token}
                    categoryName="delivery"
                  />
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </PageCard>
  );
};

export default DeliveryPage;
