<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { creators } from '../data/games'

const activeMemberships = ref(readMemberships())
const selectedCreator = ref(creators[0] ?? '')
const cardholder = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const paymentError = ref('')
const isLoggedIn = ref(localStorage.getItem('cuenta-iniciada') === 'true')

const selectedMembershipIsActive = computed(() =>
  activeMemberships.value.includes(selectedCreator.value),
)

function readMemberships(): string[] {
  try {
    const savedMemberships = JSON.parse(localStorage.getItem('membresias-activas') ?? '[]')
    return Array.isArray(savedMemberships)
      ? savedMemberships.filter((creator): creator is string => typeof creator === 'string')
      : []
  } catch {
    return []
  }
}

function updateLoginStatus() {
  isLoggedIn.value = localStorage.getItem('cuenta-iniciada') === 'true'
}

function updateMemberships() {
  activeMemberships.value = readMemberships()
}

function activateMembership() {
  paymentError.value = ''
  updateLoginStatus()

  if (!isLoggedIn.value) {
    paymentError.value = 'Debes iniciar sesión antes de activar la membresía.'
    return
  }

  if (
    !cardholder.value.trim() ||
    !cardNumber.value.trim() ||
    !expiry.value.trim() ||
    !cvv.value.trim()
  ) {
    paymentError.value = 'Completa todos los datos de la tarjeta.'
    return
  }

  const memberships = new Set(readMemberships())
  memberships.add(selectedCreator.value)
  localStorage.setItem('membresias-activas', JSON.stringify([...memberships]))
  activeMemberships.value = [...memberships]
  cardNumber.value = ''
  expiry.value = ''
  cvv.value = ''
  window.dispatchEvent(new Event('membresia-actualizada'))
}

onMounted(() => {
  window.addEventListener('cuenta-actualizada', updateLoginStatus)
  window.addEventListener('membresia-actualizada', updateMemberships)
})
onBeforeUnmount(() => {
  window.removeEventListener('cuenta-actualizada', updateLoginStatus)
  window.removeEventListener('membresia-actualizada', updateMemberships)
})
</script>

<template>
  <main class="membership-page">
    <section class="membership-panel">
      <p class="eyebrow">MEMBRESÍAS POR CANAL</p>
      <h1>Elige al creador que quieres apoyar</h1>
      <p class="intro">Cada membresía desbloquea los videos exclusivos de un solo canal.</p>

      <label for="creator">Canal</label>
      <select id="creator" v-model="selectedCreator">
        <option v-for="creator in creators" :key="creator" :value="creator">{{ creator }}</option>
      </select>

      <template v-if="selectedMembershipIsActive">
        <p class="active-message">Ya tienes activa la membresía de {{ selectedCreator }}.</p>
        <RouterLink class="back-link" :to="{ name: 'home' }">Ver videos de {{ selectedCreator }}</RouterLink>
      </template>

      <template v-else>
        <p v-if="!isLoggedIn" class="login-required">
          Para activar una membresía necesitas tener una sesión iniciada.
          <RouterLink :to="{ name: 'cuenta' }">Iniciar sesión</RouterLink>
        </p>

        <form class="payment-form" @submit.prevent="activateMembership">
          <label for="cardholder">Nombre del titular</label>
          <input id="cardholder" v-model="cardholder" type="text" autocomplete="cc-name" required>

          <label for="card-number">Número de tarjeta</label>
          <input
            id="card-number"
            v-model="cardNumber"
            type="text"
            autocomplete="cc-number"
            placeholder="Número de la tarjeta"
            required
          >

          <div class="payment-row">
            <div>
              <label for="expiry">Vencimiento</label>
              <input id="expiry" v-model="expiry" type="text" placeholder="MM/AA" required>
            </div>
            <div>
              <label for="cvv">CVV</label>
              <input id="cvv" v-model="cvv" type="text" placeholder="***" required>
            </div>
          </div>

          <p v-if="paymentError" class="payment-error" role="alert">{{ paymentError }}</p>
          <button type="submit">Pagar membresía de {{ selectedCreator }}</button>
        </form>
    
      </template>
    </section>
  </main>
</template>

<style scoped>
.membership-page {
  display: grid;
  min-height: calc(100vh - 68px);
  padding: 32px 24px;
  place-items: start center;
}

.membership-panel {
  width: min(100%, 470px);
  padding: 32px;
  color: #f5f4fb;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 15px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #71e2ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

h1 {
  margin: 0;
  font-size: var(--heading-xl);
  line-height: 1.15;
}

.intro,
.active-message {
  margin-top: 10px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

label {
  display: block;
  margin-top: 18px;
}

select,
input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  padding: 11px 12px;
  color: #f5f4fb;
  background: #11111a;
  border: 1px solid #383846;
  border-radius: 7px;
}

.payment-form {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.payment-form label {
  margin-top: 0;
}

.payment-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.payment-row div {
  display: grid;
  gap: 10px;
}

.payment-row input {
  margin-top: 0;
}

button {
  margin-top: 8px;
  padding: 11px 16px;
  color: #17111a;
  background: #71e2ff;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 700;
}

.payment-error {
  margin: 4px 0 0;
  color: #ff9dbf;
  font-size: 14px;
}

.login-required {
  margin-top: 20px;
  padding: 12px;
  color: #ffcf8a;
  background: rgba(255, 207, 138, 0.1);
  border: 1px solid rgba(255, 207, 138, 0.35);
  border-radius: 7px;
  font-size: 14px;
}

.login-required a,
.back-link {
  color: #71e2ff;
}

.security-note {
  margin-top: 16px;
  color: #a7a5b5;
  font-size: 12px;
}

@media (max-width: 600px) {
  .membership-panel {
    padding: 24px;
  }
}
</style>
