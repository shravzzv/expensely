'use client'

import { TransactionInterface } from '@/types/transaction'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle, ArrowDownCircle, Trash, Pen } from 'lucide-react'
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
import { useState } from 'react'
import { toast } from 'sonner'
import { useCategoryStore } from '@/stores/category-store'

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { categories } = useCategoryStore()

  const handleDelete = () => {
    onDelete(transaction.id!)
    toast.success('Transaction has been deleted')
  }

  const handleUpdate = (updated: TransactionInterface) => {
    onUpdate(transaction.id!, updated)
    toast.success('Transaction has been updated')
    setIsDrawerOpen(false)
  }

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
          {transaction.amount}
        </p>
      </div>

      {transaction.description && (
        <p className='text-sm'>{transaction.description}</p>
      )}

      <p className='text-xs text-muted-foreground'>
        {transaction.date
          ? new Date(transaction.date).toDateString()
          : 'No date'}
      </p>

      {transaction.categoryIds && transaction.categoryIds.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {transaction.categoryIds.map((cId) => {
            const category = categories.find((cat) => cat.id === cId)
            if (!category) return null
            return (
              <Badge
                key={cId}
                className='rounded-full text-xs text-white'
                style={{
                  backgroundColor: category.color,
                }}
              >
                {category.name}
              </Badge>
            )
          })}
        </div>
      )}

      <div className='flex gap-2 pt-2'>
        <Button
          variant='destructive'
          size='sm'
          className='cursor-pointer'
          onClick={handleDelete}
        >
          <Trash />
          Delete
        </Button>

        <Drawer
          direction='right'
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button variant='outline' size='sm' className='cursor-pointer'>
              <Pen />
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
                onUpdate={handleUpdate}
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
    </div>
  )
}
