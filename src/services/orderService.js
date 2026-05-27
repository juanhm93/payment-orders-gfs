import client from './client'

export const getOrders = async (
  page = 1,
  perPage = 10,
  status = 'all',
  search = '',
  id = undefined,
) => {
  const params = {
    _page: page,
    _per_page: perPage,
  }
  if (status !== 'all') {
    params.status = status
  }
  if (search) {
    params['supplierName_like'] = search
  }

  if (id) {
    params.id = id
  }

  const stringParams = new URLSearchParams(params).toString()

  history.replaceState(null, '', `/?${stringParams}`)
  const response = await client.get('/orders', { params })
  return {
    data: response.data,
    totalOrders: parseInt(response.headers['x-total-count']),
  }
}

export const getOrderById = async (id) => {
  const response = await client.get(`/orders/${id}`)
  return response.data
}

export const createOrder = async (order) => {
  const response = await client.post('/orders', order)
  return response
}

export const updateOrder = async (id, order) => {
  const response = await client.patch(`/orders/${id}`, order)
  return response.data
}
