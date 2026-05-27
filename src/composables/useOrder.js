import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { createOrder, updateOrder } from '@/services/orderService'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

export const useOrder = () => {
  const router = useRouter()
  const orderStore = useOrderStore()
  const isLoading = ref(false)
  const showMessageSuccess = ref(false)
  const showMessageError = ref(false)
  const isModalOpen = ref(false)

  const validationSchema = yup.object({
    supplierName: yup.string().required('El nombre del proveedor es requerido'),
    ammount: yup.number().required('El monto es requerido').min(0, 'El monto debe ser mayor a 0'),
    concept: yup.string().required('El concepto es requerido'),
  })
  const { handleSubmit } = useForm({
    validationSchema,
  })
  const { value: supplierName, errorMessage: supplierNameError } = useField('supplierName')
  const { value: ammount, errorMessage: ammountError } = useField('ammount')
  const { value: concept, errorMessage: conceptError } = useField('concept')

  const onSubmit = handleSubmit(async (values) => {
    try {
      isLoading.value = true
      console.log(values)

      const order = {
        ...values,
        status: 'BORRADOR',
        createdAt: new Date().toISOString(),
      }

      const { status, data } = await createOrder(order)

      if (status === 201) {
        router.push({ name: 'order-list', query: { _page: 1, _per_page: 10, id: data.id } })
      }
    } catch (e) {
      console.log(e)
      showMessageError.value = true
    } finally {
      isLoading.value = false
    }
  })

  const validationSchemaUpdateStatus = yup.object({
    status: yup.string().required('El estatus es requerido'),
  })

  const { handleSubmit: handleSubmitUpdateStatus } = useForm({
    validationSchema: validationSchemaUpdateStatus,
  })

  const { value: status, errorMessage: statusError } = useField('status')

  const onSubmitUpdateStatus = handleSubmitUpdateStatus(async (values) => {
    try {
      isLoading.value = true
      if (!orderStore.orderData.id) {
        throw new Error('No se encontró la orden')
      }
      const newOrder = await updateOrder(orderStore.orderData.id, { status: values.status })
      orderStore.orderData.status = newOrder.status
      isModalOpen.value = false
      showMessageSuccess.value = true
    } catch (e) {
      console.error(e)
      if (e.message === 'No se encontró la orden') {
        showMessageError.value = true
        return
      }
      orderStore.error = e.message
    } finally {
      isLoading.value = false
      setTimeout(() => {
        showMessageSuccess.value = false
        showMessageError.value = false
      }, 5000)
    }
  })

  function openModal() {
    isModalOpen.value = true
  }
  function closeModal() {
    isModalOpen.value = false
  }

  return {
    supplierName,
    ammount,
    concept,
    supplierNameError,
    ammountError,
    conceptError,
    isLoading,
    status,
    statusError,
    isModalOpen,
    showMessageSuccess,
    showMessageError,
    onSubmit,
    onSubmitUpdateStatus,
    openModal,
    closeModal,
  }
}
