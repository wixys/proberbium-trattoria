<template>
  <div>
    <ul class="list-group">
      <li v-for="(item, index) in items" :key="index" class="list-group-item">
        <NuxtLink :to="item.link" class="text-decoration-none">
          <i v-if="item.icon" :class="item.icon"></i>
          <span :class="item.class">{{ item.title }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });
</script>
