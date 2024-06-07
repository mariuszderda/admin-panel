import { Avatar } from "@/components/header/avatar";
import { Navigation } from "@/components/header/navigation";
import { SearchBox } from "@/components/header/searchBox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Header = () => {
  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Navigation />

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SearchBox />
          <Avatar />
        </div>
      </header>
    </div>
  );
};
