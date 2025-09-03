'use client'

import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useCategoryStore } from '@/stores/category-store'
import { toast } from 'sonner'

interface CategoryProps {
  id: string
  name: string
  color?: string
}

export default function Category({ id, name, color }: CategoryProps) {
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

      <div className='flex items-center'>
        <Button size='icon' variant='ghost' className='cursor-pointer'>
          <Pencil />
        </Button>
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
