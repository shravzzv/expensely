export interface TransactionInterface {
  id?: string
  amount: number
  description?: string
  date: Date
  category: string[]
  type: 'income' | 'expense'
}
