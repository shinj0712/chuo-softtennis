<template>
  <figure class="image">
    <picture class="image__picture" :class="aspectClass">
      <!-- PC -->
      <template v-if="src.lg">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.lg}px)`"
          :srcset="`/_nuxt/assets/images/${src.lg}`"
          @error="imgError"
        >
      </template>

      <!-- Tablet -->
      <template v-if="src.md">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.md}px)`"
          :srcset="`/_nuxt/assets/images/${src.md}`"
          @error="imgError"
        >
      </template>

      <!-- SP -->
      <template v-if="src.sm">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.sm}px)`"
          :srcset="`/_nuxt/assets/images/${src.sm}`"
          @error="imgError"
        >
      </template>

      <!-- Default -->
      <img
        :src="`/_nuxt/assets/images/${src.default}`"
        :alt="alt"
        class="image__img"
        :class="radiusClass"
        @error="imgError"
      >
    </picture>
  </figure>
</template>

<script lang="ts" setup>
// ウィンドウ共通情報
const { breakpoints } = useWindow();

// インターフェイス
interface Props {
  src: {
    lg?: string;
    md?: string;
    sm?: string;
    default: string;
  };
  alt: string;
  aspect?: string;
  radius?: string;
}

// Propsの初期値を設定して格納
const { src, alt, aspect='rectangle', radius='soft' } = defineProps<Props>();
const aspectClass = computed<string | null>(() => (aspect) ? `image__picture--${aspect}` : null);
const radiusClass = computed<string | null>(() => (radius) ? `image__img--${radius}` : null);

// imgのエラーハンドリング
// TODO：動作するか確認する
const imgError = (e: any): void => {
  e.target.src = '/_nuxt/assets/images/noimage.png';
}
</script>

<style ${2|scoped,|} lang="scss">
.image {
  margin: 0;

  &__picture {
    display: block;
    width: 100%;

    &--square {
      @include trimming(aspect(square));
    }

    &--rectangle {
      @include trimming(aspect(rectangle));
    }

    &--vertical {
      @include trimming(aspect(vertical));
    }
  }

  &__img {

    &--hard {
      border-radius: radius(hard);
    }

    &--soft {
      border-radius: radius(soft);
    }

    &--normal {
      border-radius: radius(normal);
    }
  }
}
</style>
