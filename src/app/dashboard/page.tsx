import React from 'react'
import { AppSidebar } from "@/components/DashboardSCNchanged/app-sidebar"
import { ChartAreaInteractive } from "@/components/DashboardSCNchanged/chart-area-interactive"
import { DataTable } from "@/components/DashboardSCNchanged/data-table"
import { SectionCards } from "@/components/DashboardSCNchanged/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader /> {/* main nav bar  */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-4 md:py-6">
              <SectionCards />
              <div className="px-4 lg:changed-px px-4">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
