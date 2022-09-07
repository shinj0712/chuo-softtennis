<template>
  <div class="thumbnail" :class="coloring">
    <picture class="thumbnail__picture">
      <img class="thumbnail__img" :src="`/_nuxt/assets/images/users/${img.src}`" :alt="img.alt" @error="handleError">
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

const { img, color = "blue" } = defineProps<Props>();

const coloring = computed<string>(() => `thumbnail--${color}`);

// イメージが見つからない場合の処理
const handleError = (e: any) => {
  e.target.src = '/_nuxt/assets/images/noimage.png';
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
