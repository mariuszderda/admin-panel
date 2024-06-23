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
import { getSession } from "@/lib/auth";
import { CustomerType } from "@/types";
import Link from "next/link";

const CustomersPage = async () => {
  const session = await getSession();
  const customers = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/customers`,
    {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
        "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
      },
    }
  ).then((res) => res.json());
  if (!customers || customers.length === 0)
    throw new Error("List of product not found");
  return (
    <PageCard
      title="Customer"
      subtitle="Manage your customers"
      createHref="customers/create"
    >
      <Table>
        <TableCaption>A list of all customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer: CustomerType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/customers/${customer._id}`,
              }}
              key={customer._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {customer._id.slice(-6)}
                </TableCell>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.last_name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell className="text-right flex justify-end items-center w-auto">
                  <ActionButtons
                    elementId={customer._id}
                    categoryName="customers"
                    token={session.user.token}
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

export default CustomersPage;
