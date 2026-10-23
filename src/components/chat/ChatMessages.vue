<script setup lang="ts">
import type { ChatMessage } from '../../interfaces/chat-message.interface.ts';
import ChatBubble from './ChatBubble.vue';
interface Props {
    messages: ChatMessage[]
}
defineProps<Props>();
</script>

<template>
    <div class="messages-list">
        <div class="messages-stack">
            <ChatBubble
                v-for="message in messages"
                :key="message.id"
                v-bind="message"
            />
        </div>
    </div>
</template>

<style scoped>
.messages-list {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 16px;
}

.messages-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
