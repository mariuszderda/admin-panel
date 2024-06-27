import { PageCard } from "@/components/page-card";
import { getDataById, getDataByIdWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { CustomerType } from "@/types";

const PaymentPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  const { token } = session.user;
  const customer: CustomerType = await getDataByIdWithToken(
    "customers",
    id,
    token
  );

  if (!customer || customer._id === undefined)
    return (
      <PageCard title="Customer detail">
        <h3>We can&apos;t load customer detail.</h3>
      </PageCard>
    );

  return (
    <PageCard title="Customer detali">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Id</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer._id}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.first_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.last_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Telephone number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.telephone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Delivery address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <dl>
                <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Street and number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.delivery.street_and_number}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    City
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.delivery.city}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Zip code
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.delivery.zip_code}
                  </dd>
                </div>
              </dl>
            </dd>
          </div>
        </dl>
      </div>
    </PageCard>
  );
};

export default PaymentPage;
