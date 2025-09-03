import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { CategoryInterface } from '@/types/category'
import { defaultCategories } from '@/data/categories'

interface CategoryState {
  categories: CategoryInterface[]
  addCategory: (category: CategoryInterface) => void
  deleteCategory: (id: string) => void
  updateCategory: (id: string, updated: Partial<CategoryInterface>) => void
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    persist(
      (set) => ({
        categories: defaultCategories,

        addCategory: (category) =>
          set(
            (state) => ({ categories: [category, ...state.categories] }),
            false,
            'categories/addCategory'
          ),

        deleteCategory: (id) =>
          set(
            (state) => ({
              categories: state.categories.filter((c) => c.id !== id),
            }),
            false,
            'categories/deleteCategory'
          ),

        updateCategory: (id, updated) =>
          set(
            (state) => ({
              categories: state.categories.map((c) =>
                c.id === id ? { ...c, ...updated } : c
              ),
            }),
            false,
            'categories/updateCategory'
          ),
      }),
      {
        name: 'categories',
      }
    ),
    { name: 'CategoryStore' }
  )
)
