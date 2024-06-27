import { PageCard } from "@/components/page-card";
import { getDataById } from "@/lib/api-call";
import { cn } from "@/lib/utils";
import { DeliveryType } from "@/types";

const PaymentPage = async ({ params: { id } }: { params: { id: string } }) => {
  const delivery: DeliveryType = await getDataById("delivery", id);

  if (!delivery || delivery._id === undefined)
    return (
      <PageCard title="Customer detail">
        <h3>We can&apos;t load customer detail.</h3>
      </PageCard>
    );

  return (
    <PageCard title="Payment detali">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Id</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {delivery._id}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Delivery type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {delivery.delivery_type}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Display name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {delivery.display_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Delivery cost
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {delivery.delivery_cost}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status
            </dt>
            <dd
              className={cn(
                "mt-1 text-sm leading-6 Esm:col-span-2 sm:mt-0 text-slate-600 font-bold",
                {
                  "text-lime-600 font-bold": delivery.status === "active",
                }
              )}
            >
              {delivery.status}
            </dd>
          </div>
        </dl>
      </div>
    </PageCard>
  );
};

export default PaymentPage;
