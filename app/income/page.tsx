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
import Transaction from '@/components/transaction'
import AddIncomeForm from '@/components/add-income-form'

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactionStore()
  const incomes = transactions.filter(
    (transaction) => transaction.type === 'income'
  )

  return (
    <div className='p-6 md:py-6 md:px-10'>
      <div className='flex items-center justify-between flex-wrap'>
        <h1 className='text-3xl font-bold tracking-tight'>Income</h1>
        <Drawer
          direction='right'
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button className='cursor-pointer'>
              <Plus />
              Add Income
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add a new income</DrawerTitle>
              <DrawerDescription>
                Fill in the details below to record your income.
              </DrawerDescription>
            </DrawerHeader>
            <div className='px-4'>
              <AddIncomeForm
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

      {incomes.length === 0 ? (
        <p className='text-muted-foreground text-sm my-4'>
          No incomes yet. Add one to get started!
        </p>
      ) : (
        <div className='mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'>
          {incomes.map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
              onUpdate={updateTransaction}
            />
          ))}
        </div>
      )}
    </div>
  )
}
