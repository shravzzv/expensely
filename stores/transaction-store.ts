import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { TransactionInterface } from '@/types/transaction'

interface TransactionState {
  transactions: TransactionInterface[]
  addTransaction: (transaction: TransactionInterface) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, updated: TransactionInterface) => void
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(
      (set) => ({
        transactions: [],

        addTransaction: (transaction) => {
          set(
            (state) => ({
              transactions: [transaction, ...state.transactions],
            }),
            false,
            'transactions/addTransaction'
          )
        },

        deleteTransaction: (id) => {
          set(
            (state) => ({
              transactions: state.transactions.filter((t) => t.id !== id),
            }),
            false,
            'transactions/deleteTransaction'
          )
        },

        updateTransaction: (id, updated) => {
          set(
            (state) => ({
              transactions: state.transactions.map((t) =>
                t.id === id ? { ...t, ...updated } : t
              ),
            }),
            false,
            'transactions/updateTransaction'
          )
        },
      }),
      {
        name: 'transactions',
      }
    ),
    { name: 'TransactionStore' }
  )
)
