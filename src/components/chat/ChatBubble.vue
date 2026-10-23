<template>
    <article class="chat-message">
        <div class="message-avatar" :class="{ mine: itsMine }">
            user
        </div>
        <div class="message-content">
            <div class="message-meta">
                <strong>{{ itsMine ? 'Tú' : 'Soporte' }}</strong>
                <time>ahora</time>
            </div>
          
        <img v-if="image" :src="image" alt="YesNoImage" class="w-52 h-52 object-cover rounded-md">
        {{  message }}
        </div>
    </article>
</template>
<script setup lang="ts">
    interface Props {
        message: string;
        itsMine: boolean;
        image?:string;
    }

    defineProps<Props>();
</script>

<style scoped>
.chat-message {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 2px 8px;
  color: #dbdee1;
  font-size: 15px;
  line-height: 1.45;
}

.message-avatar {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  place-items: center;
  color: #fff;
  background: #5865f2;
  border-radius: 50%;
  font-weight: 700;
}

.message-avatar.mine {
  background: #eb459e;
}

.message-content {
  min-width: 0;
}

.message-meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 2px;
}

.message-meta strong {
  color: #f2f3f5;
  font-size: 15px;
}

.message-meta time {
  color: #949ba4;
  font-size: 11px;
}

.message-content p {
  overflow-wrap: anywhere;
}

.message-content img {
  display: block;
  width: min(208px, 100%);
  max-height: 208px;
  margin-top: 8px;
  object-fit: cover;
  border-radius: 8px;
}
</style>