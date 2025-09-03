'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useCategoryStore } from '@/stores/category-store'

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  color: z.string().optional(),
})

interface AddCategoryFormProps {
  setIsDialogOpen: (open: boolean) => void
}

export default function AddCategoryForm({
  setIsDialogOpen,
}: AddCategoryFormProps) {
  const { addCategory } = useCategoryStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: '#4ECDC4',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newCategory = {
      id: uuidv4(),
      name: values.name,
      color: values.color,
    }
    addCategory(newCategory)
    toast.success(`Category "${values.name}" has been added!`)
    form.reset()
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
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter category name' {...field} />
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
                <Input type='color' {...field} />
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
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  )
}
