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
import { PaymentType } from "@/types";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const PaymentsPage = async () => {
  const payments = await getData("payments");
  const session = await getSession();

  if (!payments || payments.length === 0)
    return (
      <PageCard
        title="Payments"
        subtitle="All payments in your store"
        createHref="/products/create"
      >
        <h2>List of payments method is empty</h2>
      </PageCard>
    );

  return (
    <PageCard
      title="Payments"
      subtitle="Create and edit payments method."
      createHref="/payments/create"
    >
      <Table>
        <TableCaption>A list of all payment </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment: PaymentType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/payments/${payment._id}`,
              }}
              key={payment._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {payment._id.slice(-6)}
                </TableCell>
                <TableCell>{payment.display_name}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell className="text-right flex justify-end items-center w-auto">
                  <ActionButtons
                    elementId={payment._id}
                    token={session?.user?.token}
                    categoryName="payments"
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

export default PaymentsPage;
