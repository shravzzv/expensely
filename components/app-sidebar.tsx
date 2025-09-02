'use client'

import { usePathname } from 'next/navigation'
import { Home, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { NavMain } from '@/components/nav-main'
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar'

const navMain = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Income', url: '/income', icon: ArrowDownCircle },
  { title: 'Expenses', url: '/expenses', icon: ArrowUpCircle },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const itemsWithActive = navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url,
  }))

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <NavMain items={itemsWithActive} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
