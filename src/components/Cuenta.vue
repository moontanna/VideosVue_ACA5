<script setup lang="ts">
import { ref } from 'vue'

interface DatosCuenta {
    nombre: string
    apellido: string
    fechaNacimiento: string
    telefono: string
    continente: string
}

const email = ref('')
const password = ref('')
const tieneCuenta = ref(Boolean(localStorage.getItem('cuenta-iniciada')))
const datos = ref<DatosCuenta>(JSON.parse(localStorage.getItem('datos-cuenta') ?? '{"nombre":"","apellido":"","fechaNacimiento":"","telefono":"","continente":""}'))
const diaNacimiento = ref('')
const mesNacimiento = ref('')
const anioNacimiento = ref('')
const dias = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'))
const meses = [
    ['01', 'Enero'], ['02', 'Febrero'], ['03', 'Marzo'], ['04', 'Abril'],
    ['05', 'Mayo'], ['06', 'Junio'], ['07', 'Julio'], ['08', 'Agosto'],
    ['09', 'Septiembre'], ['10', 'Octubre'], ['11', 'Noviembre'], ['12', 'Diciembre'],
]
const anios = Array.from({ length: 100 }, (_, index) => String(new Date().getFullYear() - index))

function actualizarFechaNacimiento() {
    if (diaNacimiento.value && mesNacimiento.value && anioNacimiento.value) {
        datos.value.fechaNacimiento = `${anioNacimiento.value}-${mesNacimiento.value}-${diaNacimiento.value}`
    }
}

function iniciarSesion() {
    actualizarFechaNacimiento()

    if (
        !email.value.trim() ||
        !password.value.trim() ||
        !datos.value.nombre.trim() ||
        !datos.value.apellido.trim() ||
        !datos.value.fechaNacimiento ||
        !datos.value.telefono.trim() ||
        !datos.value.continente
    ) return

    localStorage.setItem('cuenta-iniciada', 'true')
    localStorage.setItem('datos-cuenta', JSON.stringify(datos.value))
    tieneCuenta.value = true
}

function cerrarSesion() {
    localStorage.removeItem('cuenta-iniciada')
    tieneCuenta.value = false
    email.value = ''
    password.value = ''
}
</script>

<template>
    <main class="account-page">
        <section v-if="!tieneCuenta" class="account-panel">
            <p class="eyebrow">CUENTA</p>
            <h1>Inicia sesión</h1>
            <p class="intro">Accede a tu cuenta para continuar.</p>

            <form class="login-form" @submit.prevent="iniciarSesion">
                <label for="nombre">Nombre</label>
                <input id="nombre" v-model="datos.nombre" type="text" required autocomplete="given-name">

                <label for="apellido">Apellido</label>
                <input id="apellido" v-model="datos.apellido" type="text" required autocomplete="family-name">

                <fieldset class="birth-date">
                    <legend>Fecha de nacimiento</legend>
                    <div class="birth-selects">
                        <select v-model="diaNacimiento" aria-label="Día de nacimiento" required>
                            <option disabled value="">Día</option>
                            <option v-for="dia in dias" :key="dia" :value="dia">{{ dia }}</option>
                        </select>
                        <select v-model="mesNacimiento" aria-label="Mes de nacimiento" required>
                            <option disabled value="">Mes</option>
                            <option v-for="mes in meses" :key="mes[0]" :value="mes[0]">{{ mes[1] }}</option>
                        </select>
                        <select v-model="anioNacimiento" aria-label="Año de nacimiento" required>
                            <option disabled value="">Año</option>
                            <option v-for="anio in anios" :key="anio" :value="anio">{{ anio }}</option>
                        </select>
                    </div>
                </fieldset>

                <label for="telefono">Número de teléfono</label>
                <input id="telefono" v-model="datos.telefono" type="tel" required autocomplete="tel">

                <label for="continente">Continente</label>
                <select id="continente" v-model="datos.continente" required>
                    <option disabled value="">Selecciona tu continente</option>
                    <option>África</option>
                    <option>América</option>
                    <option>Asia</option>
                    <option>Europa</option>
                    <option>Oceanía</option>
                    <option>Antártida</option>
                </select>

                <label for="email">Correo electrónico</label>
                <input id="email" v-model="email" type="email" required autocomplete="email">

                <label for="password">Contraseña</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    autocomplete="current-password"
                >

                <button type="submit">Iniciar sesión</button>
            </form>
        </section>

        <section v-else class="account-panel">
            <p class="eyebrow">CUENTA</p>
            <h1>Bienvenido, {{ datos.nombre }}</h1>
            <p class="intro">Has iniciado sesión correctamente.</p>
            <dl class="profile-data">
                <div><dt>Apellido</dt><dd>{{ datos.apellido }}</dd></div>
                <div><dt>Fecha de nacimiento</dt><dd>{{ datos.fechaNacimiento }}</dd></div>
                <div><dt>Teléfono</dt><dd>{{ datos.telefono }}</dd></div>
                <div><dt>Continente</dt><dd>{{ datos.continente }}</dd></div>
            </dl>
            <button type="button" @click="cerrarSesion">Cerrar sesión</button>
        </section>
    </main>
</template>

<style scoped>
.account-page {
    display: grid;
    min-height: calc(100vh - 68px);
    padding: 32px 24px;
    place-items: start center;
}

.account-panel {
    width: min(100%, 430px);
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

.intro {
    margin-top: 10px;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.5;
}

.login-form {
    display: grid;
    gap: 10px;
    margin-top: 24px;
}

input {
    box-sizing: border-box;
    width: 100%;
    padding: 11px 12px;
    color: #f5f4fb;
    background: #11111a;
    border: 1px solid #383846;
    border-radius: 7px;
}

select {
    box-sizing: border-box;
    width: 100%;
    padding: 11px 12px;
    color: #f5f4fb;
    background: #11111a;
    border: 1px solid #383846;
    border-radius: 7px;
}

.birth-date {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 0;
    border: 0;
}

.birth-date legend {
    padding: 0;
}

.birth-selects {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 8px;
}

.profile-data {
    display: grid;
    gap: 14px;
    margin: 24px 0;
}

.profile-data div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid #383846;
    padding-bottom: 8px;
}

.profile-data dt {
    color: #a7a5b5;
}

.profile-data dd {
    margin: 0;
    text-align: right;
}

button {
    margin-top: 12px;
    padding: 11px 16px;
    color: #17111a;
    background: #71e2ff;
    border: 0;
    border-radius: 7px;
    cursor: pointer;
    font-weight: 700;
}
</style>