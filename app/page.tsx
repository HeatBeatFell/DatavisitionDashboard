import { TotalProductionCard } from "@/components/total-production-card";
import { LayoutHeader } from "@/components/layout-header";
import { ScannerCards } from "@/components/scanner-card";
import { FrontendFlowCard } from "@/components/frontend-flow-card";
import { BackendFlowCard } from "@/components/backend-flow-card";
import { CacheCard } from "@/components/cache-card";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LayoutHeader />
      <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6 !pb-0">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 px-4 *:data-[slot=card]: *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-7">
          <ScannerCards />
          <div className=" col-span-3 grid grid-cols-2 gap-6 lg:pl-6">
            <CacheCard />
            <FrontendFlowCard />
            <BackendFlowCard />
          </div>
        </div>
        <TotalProductionCard />
      </div>
      <footer className="flex justify-center items-center h-10">
        <div className="text-sm">© 2024 Homag China. All rights reserved.</div>
      </footer>
    </div>
  );
}
