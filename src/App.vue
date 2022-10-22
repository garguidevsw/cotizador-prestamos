<script setup>
  import { ref, computed, watch } from 'vue'
  import Header from './components/Header.vue'
  import Button from './components/Button.vue'
  import { calcTotal } from './helpers'

  const qty = ref(10000)
  const months = ref(6)
  const total = ref(0)
  // const total = ref( calcTotal(qty.value, months.value ) )

  const MIN = 0
  const MAX = 20000
  const STEP = 100

  watch([qty, months], () => {
    total.value = calcTotal(qty.value, months.value)
  })

  const monthlyPayment = computed(() => {
    return moneyFormat(total.value / months.value)
  })

  const moneyFormat = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return formatter.format(value)
  }

  const handleDecrement = () => {
    if( qty.value > MIN){
      qty.value -= STEP
    }
  }

  const handleIncrement = () => {
    if( qty.value < MAX){
      qty.value += STEP
    }
  }

  // const moneyFormat = computed(() => {
  //   const formatter = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD'
  //   })
  //   return formatter.format(qty.value)
  // })

  // watch([qty, months], () => {
  //   total.value = calcTotal(qty.value, months.value)
  // }, {immediate: true})

</script>

<template>

  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />

    <div class="flex justify-between mt-10">
      <Button operation="-" @fn="handleDecrement" />
      <Button operation="+" @fn="handleIncrement" />
    </div>
    <div class="my-5">
      <input 
        type="range"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="qty"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-700"
      />
      <p class="text-center my-10 text-4xl font-bold text-indigo-500">{{ moneyFormat(qty) }}</p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Elige un <span class="text-indigo-600">plazo</span> a pagar</h2>

      <select class="mt-5 w-full bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500" 
        :value="months"
        v-model="months">
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
    </div>

    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Resumen <span class="text-indigo-600">de pagos</span></h2>

      <p class="text-xl text-gray-500 text-center font-bold">{{ months }} Meses</p>
      <p class="text-xl text-gray-500 text-center font-bold">Total a pagar: {{ moneyFormat(total) }}</p>
      <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ monthlyPayment }}</p>
    </div>

    <p class="text-center text-indigo-500 font-light">Añade una cantidad y un plazo a pagar</p>

  </div>
</template>

<style scoped>

</style>
