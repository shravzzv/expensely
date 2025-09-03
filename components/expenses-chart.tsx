'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useTransactionStore } from '@/stores/transaction-store'

export const description = 'A bar chart showing trends in the expenses'

const chartConfig = {
  expense: {
    label: 'Expense',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ExpensesChart() {
  const { transactions } = useTransactionStore()

  const expenses = transactions.filter((t) => t.type === 'expense')

  // aggregate by date
  const grouped = expenses.reduce<Record<string, number>>((acc, t) => {
    const dateKey = new Date(t.date).toLocaleDateString()
    acc[dateKey] = (acc[dateKey] || 0) + t.amount
    return acc
  }, {})

  // transform to chart data and sort by date (oldest -> newest)
  const chartData = Object.entries(grouped)
    .map(([date, expense]) => ({
      date,
      expense,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const hasData = chartData.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>All time</CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='date'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='expense' fill='var(--color-expense)' radius={8} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className='text-muted-foreground text-sm'>
            No expenses yet. Add some to see trends 💸
          </div>
        )}
      </CardContent>
      {hasData && (
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='text-muted-foreground leading-none'>
            Each bar represents the{' '}
            <span className='font-medium'>total expenses for a given date</span>
            . If you added multiple expenses on the same day, they are combined
            into one bar.
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
