"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION_PAGES } from "@/data/portfolioData";
import { EditorialHeader } from "./EditorialHeader";
import { EditorialFooter } from "./EditorialFooter";
import { SideNavigation } from "./SideNavigation";
import { HorizontalStage } from "./HorizontalStage";
import { SchedulingModal } from "./SchedulingModal";

interface EditorialLayoutShellProps {
  children: React.ReactNode;
}

export const EditorialLayoutShell: React.FC<EditorialLayoutShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [scheduleOpen, setScheduleOpen] = useState(false);

  // If in admin panel, render admin cleanly without horizontal portfolio framing
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Calculate current page index for navigation
  const pageMatch = NAVIGATION_PAGES.find((p) =>
    p.path === "/" ? pathname === "/" : pathname.startsWith(p.path)
  );
  const currentIndex = pageMatch ? pageMatch.index : 0;

  return (
    <>
      {/* 1. Master Fixed Editorial Header */}
      <EditorialHeader onOpenSchedule={() => setScheduleOpen(true)} />

      {/* 2. Side Floating Navigation Controls */}
      <SideNavigation currentIndex={currentIndex} />

      {/* 3. Horizontal Camera Sliding Stage */}
      <HorizontalStage />

      {/* 4. Fixed Editorial Footer with Progress & Sound */}
      <EditorialFooter currentIndex={currentIndex} />

      {/* 5. Direct Scheduling Modal (Email & WhatsApp filters) */}
      <SchedulingModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />

      {/* 6. Semantic SSR Fallback container for search engines (Google, etc.) */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </>
  );
};
