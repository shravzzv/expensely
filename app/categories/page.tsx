'use client'

import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { useCategoryStore } from '@/stores/category-store'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  const { categories, deleteCategory } = useCategoryStore()

  return (
    <div className='p-6 md:py-6 md:px-10'>
      <div className='flex items-center justify-between flex-wrap mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
      </div>

      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <div
            key={category.id}
            className='flex items-center gap-1 rounded-full px-2 py-0.5 bg-muted shadow'
          >
            <Badge
              className='text-white rounded-full'
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </Badge>

            <div className='flex items-center'>
              <Button size='icon' variant='ghost' className='cursor-pointer'>
                <Pencil />
              </Button>
              <Button
                size='icon'
                variant='ghost'
                onClick={() => deleteCategory(category.id)}
                className='cursor-pointer'
              >
                <Trash2 className='text-red-500' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
