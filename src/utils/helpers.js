import { STATUS_PILL_CLASS } from './constants'

export function formatAmount(amount) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(isoDate) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

export function getStatusPillClass(status) {
  return STATUS_PILL_CLASS[status] ?? 'bg-gray-100 text-gray-800 ring-gray-200'
}
