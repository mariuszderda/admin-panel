import { DeleteButton } from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

type ActionButtonsProps = {
  elementId: string;
  token?: string | number;
  categoryName: string;
};

export const ActionButtons = ({
  elementId,
  token,
  categoryName,
}: ActionButtonsProps) => {
  return (
    <>
      <Link href={`/${categoryName}/edit/${elementId}`}>
        <Button variant="ghost" className="text-primary">
          <Edit />
        </Button>
      </Link>
      <DeleteButton id={elementId} token={token} categoryName={categoryName} />
    </>
  );
};
