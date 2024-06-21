import { DeleteButton } from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

type ActionButtonsProps = {
  productId: string;
  token?: string | number;
  categoryName: string;
};

export const ActionButtons = ({
  productId,
  token,
  categoryName,
}: ActionButtonsProps) => {
  return (
    <>
      <Link href={`/products/edit/${productId}`}>
        <Button variant="ghost" className="text-primary">
          <Edit />
        </Button>
      </Link>
      <DeleteButton id={productId} token={token} categoryName={categoryName} />
    </>
  );
};
