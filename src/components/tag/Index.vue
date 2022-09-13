<template>
  <div class="tag" :class="[coloring, sizing]">
    <slot name="text">
      <span class="tag__text" :class="{ 'tag__text-en': isAlphanumeric(text) }">
        {{ text }}
      </span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}
const { text, color='darkblue', size = 'sm' } = defineProps<Props>();
const coloring = computed<string>(() => `tag--${color}`);
const sizing = computed<string>(() => `tag--${size}`);

/**
 * 半角英数字の場合、trueを返す
 *
 * @param {string} str
 * @return {boolean}
 */
const isAlphanumeric = (str: string): boolean => /^[A-Za-z0-9]*$/.test(str);
</script>

<style ${2|scoped,|} lang="scss">
.tag {
  $this: &;
  @include flex(row wrap, center, center);
  color: color(white);
  padding: 0 interval(1.5);
  border-radius: radius(normal);
  background-color: color(light);

  &--darkblue {
    background-color: color(darkblue);
  }

  &--lightgreen {
    background-color: color(lightGreen);
  }

  &--orange {
    background-color: color(orange);
  }

  &--outline-orange {
    background-color: color(white);
    border: 2px solid color(orange);
    color: color(orange);
  }

  &--red {
    background-color: color(japanRed);
  }

  &--twitter {
    background-color: color(twitter);
  }

  &--sm {
    #{$this}__text {
      font: bold .8rem/2 arial;
    }
  }

  &--md {
    #{$this}__text {
      font: bold 1rem/2 arial;
    }
  }

  &--lg {
    #{$this}__text {
      font: bold 1.2rem/2 arial;
    }
  }

  &__text {
    letter-spacing: 1.8px;

    &-en {
      letter-spacing: 1px;
    }

    @include mq(md) {
      font: bold .9rem/2 arial;
    }
  }
}
</style>
