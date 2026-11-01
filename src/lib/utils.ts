import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* Utility Functions */

export function formatCurrency(
  amount: number,
  currency: 'KES' | 'USD' | 'EUR' | 'GBP'
): string {
  const formats: Record<string, string> = {
    KES: 'KES',
    USD: '$',
    EUR: '€',
    GBP: '£',
  }
  return `${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${formats[currency]}`
}

export function formatNumber(
  num: number,
  options: { notation?: 'compact' | 'standard'; style?: 'percent'; maximumFractionDigits?: number } = {}
): string {
  const defaults: Intl.NumberFormatOptions = { maximumFractionDigits: 1 }

  if (options.notation === 'compact') {
    defaults.notation = 'compact'
  }

  if (options.style === 'percent') {
    defaults.style = 'percent'
  }

  return num.toLocaleString(undefined, { ...defaults, ...options })
}

export function calculateROI(
  currentRevenue: number,
  projectedRevenue: number,
  investment: number
): { roi: number; paybackMonths: number } {
  const profit = projectedRevenue - currentRevenue - investment
  const roi = (profit / investment) * 100
  const monthlySavings = investment / 12 // Assuming 12-month payback
  const paybackMonths = investment / monthlySavings

  return { roi: Math.round(roi), paybackMonths: Math.round(paybackMonths) }
}

export function debounce<
  Fn extends (...args: any[]) => void
>(func: Fn, wait: number): Fn {
  let timeout: NodeJS.Timeout
  return ((...args: Parameters<Fn>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as Fn
}