import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface PageCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  createHref?: string;
}

export const PageCard: FC<PageCardProps> = ({
  children,
  title,
  subtitle,
  createHref,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="grid gap-2 text-sm">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          {createHref && (
            <div className="">
              <Link href={createHref}>
                <Button>Create</Button>
              </Link>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
