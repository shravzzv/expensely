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
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

export default function Page() {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

  const addTransaction = (transaction: TransactionInterface) => {
    setTransactions((prev) => [...prev, transaction])
    toast.success('Transaction has been added')
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
    toast.success('Transaction has been deleted')
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
          <div
            key={transaction.id}
            className='rounded-lg border p-4 shadow-sm space-y-2'
          >
            <div className='flex items-center gap-2'>
              {transaction.type === 'income' ? (
                <ArrowUpCircle className='w-5 h-5 text-green-500' />
              ) : (
                <ArrowDownCircle className='w-5 h-5 text-red-500' />
              )}
              <p
                className={`text-lg font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'expense'
                  ? `-${transaction.amount}`
                  : `+${transaction.amount}`}
              </p>
            </div>

            {transaction.description && (
              <p className='text-sm'>{transaction.description}</p>
            )}

            <p className='text-xs text-muted-foreground'>
              {transaction.date.toDateString()}
            </p>

            {Array.isArray(transaction.category) ? (
              <div className='flex flex-wrap gap-2 mt-2'>
                {transaction.category.map((category, idx) => (
                  <Badge
                    key={idx}
                    variant='secondary'
                    className='rounded-full px-3 py-1 text-sm'
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            ) : (
              <Badge
                variant='secondary'
                className='rounded-full px-3 py-1 text-sm mt-2'
              >
                {transaction.category}
              </Badge>
            )}

            <div className='flex gap-2 pt-2'>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => deleteTransaction(transaction.id!)}
              >
                Delete
              </Button>
              <Button variant='outline' size='sm'>
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
