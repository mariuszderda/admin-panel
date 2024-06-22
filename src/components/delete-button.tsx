"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const DeleteButton = ({
  id,
  token,
  categoryName,
}: {
  id: string;
  token?: string | number;
  categoryName: string;
}) => {
  const deleteProduct = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete this ${categoryName}?`))
      await fetch(`http://localhost:3000/${categoryName}/${id}`, {
        // mode: "no-cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw response;
          window.location.reload();
          return response.json();
        })
        .then((data) => {
          toast("Successfully deleted");
          return data;
        })
        .catch((error) => {
          // @ts-ignore @ts-expect-error
          throw new Error("Failed to delete a product. Please try again later");
        });
  };
  return (
    <Button
      className="text-red-600 ml-1"
      variant="ghost"
      onClick={(e) => deleteProduct(id, e)}
    >
      <Trash2 />
    </Button>
  );
};
