import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { createOrder } from '@/services/orderService'
import { useRouter } from 'vue-router'

export const useOrder = () => {
  const router = useRouter()
  const isLoading = ref(false)
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
    } finally {
      isLoading.value = false
    }
  })

  return {
    onSubmit,
    supplierName,
    ammount,
    concept,
    supplierNameError,
    ammountError,
    conceptError,
    isLoading,
  }
}
