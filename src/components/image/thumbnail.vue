<template>
  <div class="thumbnail" :class="coloring">
    <picture class="thumbnail__picture">
      <img class="thumbnail__img" :src="img.src" :alt="img.alt" @error="noImage">
    </picture>
  </div>
</template>

<script lang="ts" setup>
interface Img {
  src: string;
  alt: string;
}

interface Props {
  img: Img;
  color: string;
}

const { img, color="blue" } = defineProps<Props>();
const coloring = computed<string>(() => `thumbnail--${color}`);
const noImage = (el: any) => {
  el.target.src = '/_nuxt/assets/images/noimage.png';
}
</script>

<style ${2|scoped,|} lang="scss">
.thumbnail {
  border-radius: radius(circle);
  display: grid;
  place-items: center;

  &--blue {
    @include gradient(color(navy), color(blue), diagonal);
  }

  &--orange {
    @include gradient(color(navy), color(orange), diagonal);
  }

  &--lightgreen {
    @include gradient(color(navy), color(lightgreen), diagonal);
  }

  &__picture {
    width: 100%;
    display: block;
    transform: scale(.95);
    @include trimming(aspect(square));
  }

  &__img {
    border-radius: radius(circle);
  }
}
</style>
