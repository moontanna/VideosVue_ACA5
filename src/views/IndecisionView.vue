<script setup lang="ts">
import { ref } from 'vue'
import ChatMessages from '../components/chat/ChatMessages.vue'
import MessageBox from '../components/chat/MessageBox.vue'
import type { ChatMessage } from '../interfaces/chat-message.interface'

const messages = ref<ChatMessage[]>([
  {
    id: new Date().getTime(),
    message: 'Hola, ¿en qué puedo ayudarte?',
    itsMine: false,
  },
    {
    id: new Date().getTime() + 1,
    message: 'No me ha llegado la recompensa por vero 30000000000 horas de directos',
    itsMine: true,
  },
  {
    id: new Date().getTime() + 2,
    message: 'Lo siento eso es imposible de resolver',
    itsMine: false,
  },
  {
    id: new Date().getTime() + 3,
    message: 'sorry',
    itsMine: false,
    image: 'https://yesno.wtf/assets/yes/3-422e51268d64d78241720a7de52fe121.gif',
  },
]);

const onMessage = (text: string) => {
  const nextId = Math.max(Date.now(), ...messages.value.map(({ id }) => id + 1))

  messages.value.push({
    id: nextId,
    itsMine: true,
    message: text,
  }, {
    id: nextId + 1,
    itsMine: false,
    message: text,
  })
}
</script>

<template>
  <main class="discord-app">
    <section class="chat-panel" aria-label="Chat con SOPORTE">
      <header class="chat-header">
        <span class="hash-icon" aria-hidden="true">#</span>
        <strong>SOPORTE</strong>
        <span class="header-divider"></span>
        <span class="chat-topic">Conversación directa</span>
      </header>

      <div class="chat-welcome">
        <span class="welcome-avatar">S</span>
        <h1>Este es el comienzo de tu conversación con SOPORTE</h1>
        <p>Envía un mensaje para empezar a chatear.</p>
      </div>

    <ChatMessages :messages="messages"/>
    <!-- Notación de tipo kebab-case -->
    <!-- Incluimos el método capturando el evento -->
    <MessageBox @send-message="onMessage($event)"/>
    
    </section>
  </main>
</template>

<style scoped>
.discord-app {
  display: flex;
  min-height: calc(100vh - 68px);
  color: #dbdee1;
  background: #313338;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
}

.welcome-avatar {
  position: relative;
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  color: white;
  background: #5865f2;
  border-radius: 50%;
  font-weight: 700;
}

.chat-panel {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.chat-header {
  display: flex;
  height: 48px;
  flex: 0 0 48px;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  color: #f2f3f5;
  background: #313338;
  border-bottom: 1px solid #26272c;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.hash-icon {
  color: #949ba4;
  font-size: 24px;
  font-weight: 500;
}

.header-divider {
  width: 1px;
  height: 24px;
  margin: 0 4px;
  background: #45464d;
}

.chat-topic {
  color: #b5bac1;
  font-size: 13px;
}

.chat-welcome {
  padding: 30px 20px 12px;
}

.welcome-avatar {
  width: 64px;
  height: 64px;
  font-size: 26px;
}

.chat-welcome h1 {
  margin: 16px 0 4px;
  color: #f2f3f5;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0;
}

.chat-welcome p {
  color: #b5bac1;
  font-size: 14px;
}

@media (max-width: 700px) {
  .chat-topic,
  .header-divider {
    display: none;
  }
}

</style>
