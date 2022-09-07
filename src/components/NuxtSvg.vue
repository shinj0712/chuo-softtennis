<template>
  <div class="nuxt-svg" :class="coloring">
    <component :is="svg"/>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  svg: any;
  color?: string;
}

const { svg, color = "white" } = defineProps<Props>();
const coloring = computed<string>(() => `nuxt-svg--${color}`)
</script>

<style ${2|scoped,|} lang="scss">
.nuxt-svg {
  width: 100%;

  & > svg {
    transition: fill .3s ease-out, transform .3s ease-out;
  }

  &--white {
    & > svg {
      fill: color(white);
    }
  }

  &--darkblue {
    & > svg {
      fill: color(darkblue);
    }
  }

  &--navy {
    & > svg {
      fill: color(navy);
    }
  }
}
</style>
