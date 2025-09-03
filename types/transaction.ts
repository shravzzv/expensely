export interface TransactionInterface {
  id?: string
  amount: number
  description?: string
  date: Date
  categoryIds: string[]
  type: 'income' | 'expense'
}
