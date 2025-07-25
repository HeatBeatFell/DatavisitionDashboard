import { ModeToggle } from "@/components/theme-toggle";

import Image from "next/image";
import logo from "../public/Logo.png";

export function LayoutHeader() {
  return (
    <header className="flex shadow-sm h-(--header-height) items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="logo" width={30} height={30}></Image>
          <h1 className="text-3xl font-bold tracking-tight ">HomagChina Dashboard</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
