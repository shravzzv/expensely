'use client'

import { TransactionInterface } from '@/types/transaction'
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
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { X, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Textarea } from './ui/textarea'
import { useCategoryStore } from '@/stores/category-store'

const formSchema = z.object({
  amount: z
    .number({ error: 'Amount must be a number' })
    .positive('Amount must be greater than 0'),
  description: z.string().optional(),
  date: z.date({ error: 'Date is required' }),
  categoryIds: z.array(z.string()).min(1, 'Select at least one category'),
  type: z.enum(['income', 'expense'], { message: 'Select type' }),
})

interface UpdateFormProps {
  transaction: TransactionInterface
  onUpdate: (updated: TransactionInterface) => void
  setIsDrawerOpen: (open: boolean) => void
}

export default function UpdateForm({
  transaction,
  onUpdate,
  setIsDrawerOpen,
}: UpdateFormProps) {
  const { categories } = useCategoryStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: transaction.amount,
      description: transaction.description ?? '',
      date: new Date(transaction.date),
      categoryIds: transaction.categoryIds ?? [],
      type: transaction.type,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onUpdate({
      ...transaction,
      ...values,
    })
    setIsDrawerOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {/* type */}
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className='flex gap-4'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='income' id='income' />
                  <label htmlFor='income'>Income</label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='expense' id='expense' />
                  <label htmlFor='expense'>Expense</label>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* amount */}
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

        {/* description */}
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

        {/* date */}
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
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* categories */}
        <FormField
          control={form.control}
          name='categoryIds'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <div className='space-y-2'>
                  {field.value.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {field.value.map((cId) => {
                        const category = categories.find((c) => c.id === cId)
                        if (!category) return null
                        return (
                          <span
                            key={cId}
                            className='flex items-center gap-1 rounded-full
                               px-3 py-1 text-sm text-white'
                            style={{ backgroundColor: category.color }}
                          >
                            {category.name}
                            <button
                              type='button'
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((v) => v !== cId)
                                )
                              }
                              className='transition-colors hover:text-red-200'
                              aria-label={`Remove ${category.name}`}
                            >
                              <X size={14} />
                            </button>
                          </span>
                        )
                      })}
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
                      {categories.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
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

        <Button type='submit'>Update</Button>
      </form>
    </Form>
  )
}
