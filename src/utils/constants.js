export const STATUS_PILL_CLASS = {
  BORRADOR: 'bg-gray-100 text-gray-800 ring-gray-200',
  APROBADA: 'bg-green-100 text-green-800 ring-green-200',
  RECHAZADA: 'bg-red-100 text-red-800 ring-red-200',
  PAGADA: 'bg-blue-100 text-blue-800 ring-blue-200',
}

export const TABLE_HEADERS = [
  {
    label: 'Proveedor',
    key: 'supplierName',
  },
  {
    label: 'Monto',
    key: 'ammount',
  },
  {
    label: 'Concepto',
    key: 'concept',
  },
  {
    label: 'Fecha de creación',
    key: 'createdAt',
  },
  {
    label: 'Estado',
    key: 'status',
  },
]
