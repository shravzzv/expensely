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
import { TransactionInterface } from '@/types/transaction'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'
import Transaction from '@/components/transaction'
import { ModeToggle } from '@/components/mode-toggle'

export default function Page() {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem('transactions')
    if (stored) {
      setTransactions(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: TransactionInterface) => {
    setTransactions((prev) => [...prev, transaction])
    toast.success('Transaction has been added')
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
    toast.success('Transaction has been deleted')
  }

  const updateTransaction = (id: string, updated: TransactionInterface) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updated } : transaction
      )
    )
    toast.success('Transaction has been updated')
  }

  const netWorth = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    return income - expenses
  }, [transactions])

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <div className='mb-2'>
        <ModeToggle />
      </div>

      <Drawer
        direction='right'
        open={isAddFormOpen}
        onOpenChange={setIsAddFormOpen}
      >
        <DrawerTrigger asChild>
          <Button className='cursor-pointer'>Add Transaction</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a new transaction</DrawerTitle>
            <DrawerDescription>
              Fill in the details below to record your income or expense.
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <AddForm add={addTransaction} setIsAddFormOpen={setIsAddFormOpen} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Card className='mt-6 rounded-2xl border border-border/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-sm font-semibold text-foreground/90'>
            Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-3xl font-bold tracking-tight ${
              netWorth >= 0
                ? 'text-emerald-500 drop-shadow-sm'
                : 'text-red-500 drop-shadow-sm'
            }`}
          >
            ₹{netWorth.toLocaleString()}
          </p>
          <p className='text-sm text-muted-foreground mt-1'>
            Total balance after income & expenses
          </p>
        </CardContent>
      </Card>

      <h2 className='text-xl font-semibold mt-8 mb-4'>Ledger</h2>

      <div className='space-y-6'>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
          />
        ))}
      </div>
    </div>
  )
}
