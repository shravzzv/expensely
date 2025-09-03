'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useCategoryStore } from '@/stores/category-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddCategoryForm from '@/components/add-category-form'
import { useState } from 'react'
import Category from '@/components/category'

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { categories } = useCategoryStore()

  return (
    <div className='p-6 md:py-6 md:px-10'>
      <div className='flex items-center justify-between flex-wrap mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>
              <Plus />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Add a New Category</DialogTitle>
              <DialogDescription>
                Enter a name and pick a color for your category.
              </DialogDescription>
            </DialogHeader>
            <div className='px-2'>
              <AddCategoryForm setIsDialogOpen={setIsDialogOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            color={category.color}
          />
        ))}
      </div>
    </div>
  )
}
