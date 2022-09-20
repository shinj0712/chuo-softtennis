<template>
  <NuxtLink :to="link" class="sns-button" :class="[sizing, snsClass]">
    <span class="sns-button__container">
      <nuxt-svg :svg="svgComponent[sns]" color="white"/>
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import Twitter from "@/assets/svg/twitter.svg?component";
import Instagram from "@/assets/svg/instagram.svg?component";

interface Props {
  sns: 'twitter' | 'instagram';
  internal?: boolean;
  size: 'sm' | 'md' | 'lg';
  link: string;
}
const { sns, size = 'sm' } = defineProps<Props>();

// custom class
const sizing = computed<string>(() => `sns-button--${size}`);
const snsClass = computed<string>(() => `sns-button--${sns}`);

// svg component
const svgComponent = {
  twitter: Twitter,
  instagram: Instagram,
}
</script>

<style ${2|scoped,|} lang="scss">
.sns-button {
  display: grid;
  place-items: center;
  border-radius: 50%;

  &--lg {
    width: 8rem;
    height: 8rem;
  }

  &--md {
    width: 6rem;
    height: 6rem;
  }

  &--sm {
    width: 5rem;
    height: 5rem;
  }

  &--twitter {
    background-color: color(twitter);
  }

  &--instagram {

  }

  &__container {
    width: 50%;
  }
}
</style>
