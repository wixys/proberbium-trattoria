<template>
  <div v-if="content">
    <div :class="content.attributes.container_class">
      <div :class="content.attributes.row_class">
        <div :class="content.attributes.row_class.col_class">
          <div :class="content.attributes.wrapper_class">
            <h2 :class="content.attributes.title_class">{{ content.attributes.title }}</h2>
            <div
              :class="content.attributes.paragraph_class"
              v-html="content.attributes.description"
            ></div>
            <div
              :class="content.attributes.paragraph_class"
              v-html="content.attributes.content"
            ></div>
            <template
              v-if="content.attributes.calltoaction && content.attributes.calltoaction.active"
            >
              <UiButtonsBaseButton
                :to="content.attributes.calltoaction.link"
                :buttonText="content.attributes.calltoaction.title"
                :icon="content.attributes.calltoaction.icon"
                :class="content.attributes.calltoaction.class"
              />
            </template>
          </div>
          <div v-if="content.attributes.items">
            <ul v-for="item in content.attributes.items" :key="item.id">
              <li>
                <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Sections-->
    <template v-if="sections">
      <UiSection :sections="sections" />
    </template>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
  defineProps({
    content: Object,
    sections: Array,
  });
</script>
