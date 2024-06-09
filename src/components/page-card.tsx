import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";

interface PageCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const PageCard: FC<PageCardProps> = ({ children, title, subtitle }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2 text-sm">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
