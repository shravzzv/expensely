'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useTransactionStore } from '@/stores/transaction-store'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddTransactionForm from '@/components/add-transaction-form'
import { IncomesChart } from '@/components/incomes-chart'
import { ExpensesChart } from '@/components/expenses-chart'

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { addTransaction } = useTransactionStore()

  return (
    <div className='p-6 md:py-6 md:px-10'>
      <div className='flex items-center justify-between flex-wrap'>
        <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
        <Drawer
          direction='right'
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button className='cursor-pointer'>
              <Plus />
              Add Transaction
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add a new transaction</DrawerTitle>
              <DrawerDescription>
                Fill in the details below to record your income or expense.
              </DrawerDescription>
            </DrawerHeader>
            <div className='px-4'>
              <AddTransactionForm
                add={addTransaction}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className='flex flex-wrap mt-6 gap-4'>
        <div className='flex-1 min-w-[300px]'>
          <IncomesChart />
        </div>
        <div className='flex-1 min-w-[300px]'>
          <ExpensesChart />
        </div>
      </div>
    </div>
  )
}
