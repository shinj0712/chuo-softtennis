<template>
  <div class="ticket" :class="[coloring, columnClass]">
    <div class="ticket__item" v-for="item in items">
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
const coloring = computed<string>(() => `ticket--${color}`);
const columnClass = computed<string>(() => `ticket--${column}`);
</script>

<style ${2|scoped,|} lang="scss">
.ticket {
  $this: &;
  @include flex(row wrap, flex-start, center, interval(2));

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
    @include flex(row wrap, flex-start, center, interval(2));

    #{$this}__item {
      width: calc(50% - interval(2));
    }
  }

  &__item {
    @include flex(row nowrap, space-between, center, interval(.5));
    width: 100%;
    padding: interval(1) interval(2);
    min-width: pixel(30);
    border-radius: 1000px;
    box-shadow: 0 1px 3px 1px color(darkShadow);
  }
}
</style>
