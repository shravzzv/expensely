'use client'

import AddForm from '@/components/add-form'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Transaction from '@/components/transaction'
import { useTransactionStore } from '@/stores/transaction-store'
import { useMemo, useState } from 'react'
import { BanknoteArrowDown, BanknoteArrowUp, Plus, Wallet } from 'lucide-react'

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactionStore()

  const { income, expenses, netWorth } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expenses,
      netWorth: income - expenses,
    }
  }, [transactions])

  return (
    <div className='p-6 md:py-6 md:px-10'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap'>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome</h1>
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
              <AddForm add={addTransaction} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Summary Cards */}
      <div className='mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {/* Net Worth */}
        <Card className='rounded-2xl border border-border/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-sm font-semibold text-foreground/90 flex items-center justify-between'>
              Net Worth
              <Wallet />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold tracking-tight ${
                netWorth >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              ${netWorth.toLocaleString()}
            </p>
            <p className='text-sm text-muted-foreground mt-1'>
              Balance after income & expenses
            </p>
          </CardContent>
        </Card>

        {/* Income */}
        <Card className='rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-900 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-sm font-semibold flex items-center justify-between text-emerald-700 dark:text-emerald-400'>
              Total Income
              <BanknoteArrowUp />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400'>
              ${income.toLocaleString()}
            </p>
            <p className='text-sm text-muted-foreground mt-1'>
              All recorded income
            </p>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className='rounded-2xl border border-border/50 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-900 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-sm font-semibold flex items-center justify-between text-red-700 dark:text-red-400'>
              Total Expenses
              <BanknoteArrowDown />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold tracking-tight text-red-600 dark:text-red-400'>
              ${expenses.toLocaleString()}
            </p>
            <p className='text-sm text-muted-foreground mt-1'>
              All recorded expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions list (optional) */}
      {/* <div className="mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
          />
        ))}
      </div> */}
    </div>
  )
}
