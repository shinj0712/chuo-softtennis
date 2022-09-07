<template>
  <div class="loading">
    <div class="loading__bar" :class="coloring" v-for="i in 8" :key="i"/>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  color: string;
}

const { color = '' } = defineProps<Props>();
const coloring = computed<string | null>(() => (color) ? `loading__bar--${color}` : null);
</script>

<style ${2|scoped,|} lang="scss">
.loading {
  @include flex(row nowrap, center, center);
  height: 100%;

  &__bar {
    width: interval(1);
    height: 80%;
    border-radius: radius(hard);
    margin-right: interval(1);
    animation: loading 0.8s infinite;

    &:last-child {
      margin-right: 0;
    }

    @for $i from 1 through 8 {
      &:nth-child( #{$i} ) {
        animation-delay: calc( 1s * #{$i} / 10 );
      }
    }

    &--navy {
      background-color: color(navy);
    }

    &--white {
      background-color: color(white);
    }
  }
}
</style>
