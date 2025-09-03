'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useCategoryStore } from '@/stores/category-store'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
})

interface UpdateCategoryFormProps {
  id: string
  currentName: string
  currentColor?: string
  setIsDialogOpen: (open: boolean) => void
}

export default function UpdateCategoryForm({
  id,
  currentName,
  currentColor,
  setIsDialogOpen,
}: UpdateCategoryFormProps) {
  const { updateCategory } = useCategoryStore()

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: currentName,
      color: currentColor || '#4ECDC4',
    },
  })

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    updateCategory(id, values)
    toast.success(`Category "${values.name}" has been updated`)
    setIsDialogOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Category name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='color'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} type='color' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type='submit'>Update</Button>
        </div>
      </form>
    </Form>
  )
}
