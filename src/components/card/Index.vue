<template>
  <div class="card" :class="[coloring, columnClass]">
    <div class="card__item" v-for="item in items">
      <slot name="content" :item="item">
        <!-- 親要素で指定 -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  items: any[];
  column?: number;
  color?: string;
}
const { items, column = 1, color = 'white' } = defineProps<Props>();
const coloring = computed<string>(() => `card--${color}`);
const columnClass = computed<string>(() => `card--${column}`);
</script>

<style ${2|scoped,|} lang="scss">
.card {
  $this: &;
  @include flex(row wrap, flex-start, stretch, interval(2));

  &--white {
    #{$this}__item {
      background-color: color(white);
    }
  }

  &--darkblue {
    #{$this}__item {
      background-color: color(darkblue);
    }
  }

  &--navy {
    #{$this}__item {
      background-color: color(navy);
    }
  }

  &--2 {
    #{$this}__item {
      width: calc(50% - interval(1)) ;
    }
  }

  &__item {
    width: 100%;
    padding: interval(1);
    min-width: pixel(30);
    border-radius: radius(normal);
    box-shadow: 0 1px 3px 1px color(darkShadow);
  }
}
</style>
