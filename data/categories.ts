import { CategoryInterface } from '@/types/category'
import { v4 as uuidv4 } from 'uuid'

export const defaultCategories: CategoryInterface[] = [
  { id: uuidv4(), name: 'Food', color: '#FF6B6B' },
  { id: uuidv4(), name: 'Transport', color: '#4ECDC4' },
  { id: uuidv4(), name: 'Shopping', color: '#FFD93D' },
  { id: uuidv4(), name: 'Entertainment', color: '#1A73E8' },
  { id: uuidv4(), name: 'Health', color: '#9C27B0' },
  { id: uuidv4(), name: 'Salary', color: '#6BCB77' },
  { id: uuidv4(), name: 'Freelance', color: '#FF9800' },
  { id: uuidv4(), name: 'Investments', color: '#00BCD4' },
  { id: uuidv4(), name: 'Gifts', color: '#E91E63' },
  { id: uuidv4(), name: 'Other Income', color: '#795548' },
]
