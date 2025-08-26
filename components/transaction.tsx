'use client'

import { TransactionInterface } from '@/types/transaction'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
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
import UpdateForm from './update-form'

interface TransactionCardProps {
  transaction: TransactionInterface
  onDelete: (id: string) => void
  onUpdate: (id: string, transaction: TransactionInterface) => void
}

export default function TransactionCard({
  transaction,
  onDelete,
  onUpdate,
}: TransactionCardProps) {
  return (
    <div className='rounded-lg border p-4 shadow-sm space-y-2'>
      <div className='flex items-center gap-2'>
        {transaction.type === 'income' ? (
          <ArrowUpCircle className='w-5 h-5 text-green-500' />
        ) : (
          <ArrowDownCircle className='w-5 h-5 text-red-500' />
        )}
        <p
          className={`text-lg font-semibold ${
            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
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
          onClick={() => onDelete(transaction.id!)}
        >
          Delete
        </Button>
        <Drawer direction='right'>
          <DrawerTrigger asChild>
            <Button variant='outline' size='sm'>
              Update
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Update transaction</DrawerTitle>
              <DrawerDescription>
                Modify the details and save changes.
              </DrawerDescription>
            </DrawerHeader>
            <div className='px-4'>
              <UpdateForm
                transaction={transaction}
                onUpdate={(updated) => onUpdate(transaction.id!, updated)}
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
    </div>
  )
}
