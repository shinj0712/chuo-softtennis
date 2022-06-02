<template>
  <div class="title" :class="coloring">
    <span class="title__assistance">{{ title.ja }}</span>
    <h2 class="title__primary">{{ title.en }}</h2>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: {
    ja: string;
    en: string;
  };
  color?: string;
}

const { title, color='darkblue' } = defineProps<Props>();
const coloring = computed<string | null>(() => (color) ? `title--${color}` : null);
</script>

<style ${2|scoped,|} lang="scss">
.title {
  padding: interval(5) 0;
  @include flex(column nowrap, center, center);

  &__assistance {
    font: .75rem arial;
    letter-spacing: 2px;
  }

  &__primary {
    font: bold 3rem/1 'bangers';
    letter-spacing: 3px;
    text-align: center;
    position: relative;
    margin-top: interval(1);
    margin-bottom: interval(2);

    &::after {
      content: '';
      display: block;
      width: pixel(6);
      height: pixel(.25);
      @include position(absolute, $b: - interval(2), $l: 50%);
      transform: translateX(-50%);
      background-color: color(darkblue);

      .title--white & {
        background-color: color(white);
      }

      .title--darkblue & {
        background-color: color(darkblue);
      }
    }
  }

  &--white {
    color: color(white);
  }

  &--darkblue {
    color: color(darkblue);
  }
}
</style>
