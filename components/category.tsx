'use client'

import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useCategoryStore } from '@/stores/category-store'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import UpdateCategoryForm from './update-category-form'

interface CategoryProps {
  id: string
  name: string
  color?: string
}

export default function Category({ id, name, color }: CategoryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deleteCategory } = useCategoryStore()

  const handleDelete = () => {
    deleteCategory(id)
    toast.success(`Category "${name}" has been deleted`)
  }

  return (
    <div className='flex items-center gap-1 rounded-full px-2 py-0.5 bg-muted shadow'>
      <Badge
        className='text-white rounded-full'
        style={{ backgroundColor: color }}
      >
        {name}
      </Badge>

      <div className='flex items-center gap-1'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size='icon' variant='ghost' className='cursor-pointer'>
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the name or color of your category.
              </DialogDescription>
            </DialogHeader>
            <div className='px-2'>
              <UpdateCategoryForm
                id={id}
                currentName={name}
                currentColor={color}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size='icon'
          variant='ghost'
          onClick={handleDelete}
          className='cursor-pointer'
        >
          <Trash2 className='text-red-500' />
        </Button>
      </div>
    </div>
  )
}
