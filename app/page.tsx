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
import { TransactionInterface } from '@/types/transaction'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Transaction from '@/components/transaction'

export default function Page() {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

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

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <Drawer direction='right'>
        <DrawerTrigger asChild>
          <Button>Add Transaction</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a new transaction</DrawerTitle>
            <DrawerDescription>
              Fill in the details below to record your income or expense.
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <AddForm add={addTransaction} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
