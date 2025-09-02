'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TransactionInterface } from '@/types/transaction'
import { v4 as uuidv4 } from 'uuid'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

const formSchema = z.object({
  amount: z.number().int().min(1, 'Amount is required'),
  description: z.string().optional(),
  date: z.date({ error: 'Date is required' }),
  category: z.array(z.string()).min(1, 'Select at least one category'),
  type: z.enum(['income', 'expense'], { message: 'Select type' }),
})

interface AddExpenseFormProps {
  add: (transaction: TransactionInterface) => void
  setIsDrawerOpen: (open: boolean) => void
}

const categoryOptions = [
  'Food',
  'Rent',
  'Travel',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Education',
  'Savings',
]

export default function AddExpenseForm({
  add,
  setIsDrawerOpen,
}: AddExpenseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: '',
      date: undefined,
      category: [],
      type: 'expense',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const transaction: TransactionInterface = {
      id: uuidv4(),
      amount: values.amount,
      description: values.description,
      date: values.date,
      category: values.category,
      type: values.type,
    }
    add(transaction)
    toast.success('Transaction has been added')
    form.reset()
    setIsDrawerOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='1'
                  min={0}
                  placeholder='Enter an amount'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Optional description'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout='dropdown'
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <div className='space-y-2'>
                  {field.value.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {field.value.map((c) => (
                        <span
                          key={c}
                          className='flex items-center gap-1 rounded-full
                   px-3 py-1 text-sm
                   bg-neutral-200 text-neutral-900
                   dark:bg-neutral-800 dark:text-neutral-100'
                        >
                          {c}
                          <button
                            type='button'
                            onClick={() =>
                              field.onChange(field.value.filter((v) => v !== c))
                            }
                            className='transition-colors
                     text-neutral-600 hover:text-red-600
                     dark:text-neutral-400 dark:hover:text-red-400'
                            aria-label={`Remove ${c}`}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        field.value.includes(value)
                          ? field.value
                          : [...field.value, value]
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select categories' />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormDescription>
                You can pick and remove categories.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
