<template>
<div class="primary-button" :class="coloring">
  <!-- 外部リンク -->
  <template v-if="type === 'externalLink'">
    <NuxtLink :to="button.link" class="primary-button__button" target="_blank">
      <span class="primary-button__key-top"></span>
      <span class="primary-button__name">{{ button.name }}</span>
      <span class="primary-button__key-bottom"></span>
    </NuxtLink>
  </template>

  <!-- 内部リンク -->
  <template v-else-if="'link'">
    <NuxtLink :to="button.link" class="primary-button__button">
      <span class="primary-button__key-top"></span>
      <span class="primary-button__name">{{ button.name }}</span>
      <span class="primary-button__key-bottom"></span>
    </NuxtLink>
  </template>

  <!-- 汎用ボタン ：クリックイベントが必要 -->
  <template v-else>
    <button class="primary-button__button" type="button" @click="$emit('clickEvent')">
      <span class="primary-button__key-top"></span>
      <span class="primary-button__name">{{ button.name }}</span>
      <span class="primary-button__key-bottom"></span>
    </button>
  </template>
</div>
</template>

<script lang="ts" setup>
interface Props {
  color?: String;
  type: string;
  button: {
    link: string;
    name: string;
  };
}

// Props
const { button, color='orange' } = defineProps<Props>();
// Computed
const coloring = computed<string>(() => `primary-button--${color}`);
// Emit
const emit = defineEmits(['clickEvent']);
</script>

<style ${2|scoped,|} lang="scss">
.primary-button {
  @include flex(row nowrap, center, center);
  --main-color: #{color(orange)};
  --sub-color: #{color(white)};
  $this: &;

  &--white.primary-button {
    --main-color: #{color(white)};
    --sub-color: #{color(darkblue)};
  }

  &__button {
    border: 2px solid var(--main-color);
    color: var(--sub-color);
    display: inline-block;
    cursor: pointer;
    padding: interval(2) interval(4);
    position: relative;
    text-decoration: none;
    font: bold 1rem/1 Arial;
    letter-spacing: .1rem;

    &::before {
      content: '';
      width: interval(4);
      height: 2px;
      background-color: var(--main-color);
      @include position(absolute, $t: 50%, $l: 1.5rem);
      transform-origin: center;
      transform: translateY(-50%);
      transition: background-color .3s linear, width .3s linear;
    }

    @include hover {
    color: var(--sub-color);
    background-color: var(--main-color);

    &::before {
      width: interval(2);
      background-color: var(--sub-color);
    }

    #{$this}__name {
      color: var(--sub-color);
      padding-left: interval(3);
    }

    #{$this}__key-top {
      left: -2px;
      width: 0;
    }

    #{$this}__key-bottom {
      right: 0;
      width: 0;
    }
  }
  }

  &__name {
    display: block;
    padding-left: interval(4);
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;
    color: var(--main-color);
  }

  &__key-top {
    height: 2px;
    width: interval(5);
    @include position(absolute, $t: -2px, $l: 10%);
    background-color: var(--sub-color);
    transition: width 0.5s ease-out, left 0.3s ease-out;
  }

  &__key-bottom {
    height: 2px;
    width: interval(3);
    @include position(absolute, $b: -2px, $r: 10%);
    background-color: var(--sub-color);
    transition: width 0.5s ease-out, right 0.3s ease-out;
  }
}
</style>
