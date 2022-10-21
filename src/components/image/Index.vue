<template>
  <figure class="image">
    <picture class="image__picture" :class="aspectClass">
      <!-- PC -->
      <template v-if="src.lg">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.lg}px)`"
          :srcset="`assets/images/${src.lg}`"
          @error="handleError"
        >
      </template>

      <!-- Tablet -->
      <template v-if="src.md">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.md}px)`"
          :srcset="`assets/images/${src.md}`"
          @error="handleError"
        >
      </template>

      <!-- SP -->
      <template v-if="src.sm">
        <source
          class="image__img"
          :media="`(min-width: ${breakpoints.sm}px)`"
          :srcset="`assets/images/${src.sm}`"
          @error="handleError"
        >
      </template>

      <!-- Default -->
      <img
        :src="`assets/images/${src.default}`"
        :alt="alt"
        class="image__img"
        :class="radiusClass"
        @error="handleError"
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
const handleError = (e: any): void => {
  e.error = null;
  e.target.src = 'assets/images/noimage.png';
}
</script>

<style ${2|scoped,|} lang="scss">
.image {
  margin: 0;

  &__picture {
    display: block;
    width: 100%;
    overflow: hidden;

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
    transition: transform .3s ease-out;

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
