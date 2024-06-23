import { PageCard } from "@/components/page-card";

export const DataNotFound = ({ message }: { message: string }) => {
  return (
    <PageCard title="Not Found">
      <h2>{message}</h2>
    </PageCard>
  );
};
