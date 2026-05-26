import client from './client'

export const getOrders = async (page = 1, perPage = 10) => {
  const params = {
    _page: page,
    _per_page: perPage,
  }

  const stringParams = new URLSearchParams(params).toString()

  history.pushState(null, '', `/?${stringParams}`)
  const response = await client.get('/orders', { params: { _page: page, _per_page: perPage } })
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
  return response.data
}
