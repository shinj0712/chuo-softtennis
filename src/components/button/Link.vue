<template>
  <nuxt-link class="link" :to="link" :class="positioning" :external="isExternal" :target="(isExternal) ? '_blank' : ''">
    <button class="link__button">
      <span class="link__label">{{ label }}</span>
      <svg viewBox="0 0 13 10" class="link__svg">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  link: string;
  position?: string;
}

const { label, link, position } = defineProps<Props>();
const positioning = computed<string | null>(() => (position) ? `link--${position}` : null);

// http でスタートするリンクは外部リンクにする
const isExternal = computed<boolean>(() => link.startsWith('http'));
</script>

<style ${2|scoped,|} lang="scss">
.link {
  $this: &;
  display: inline-block;
  width: 100%;
  padding: .8rem 1.5rem;
  pointer-events: auto;
  text-decoration: none;

  &--right {
    text-align: right;
  }

  &--right-bottom {
    height: 100%;
    text-align: right;
    @include flex(column, flex-end, flex-end);
  }

  &--center {
    height: 100%;
    text-align: center;
    @include flex(column, center, center);
  }

  @include hover {
    #{$this}__button::before {
      left: 50%;
      background-color: color(white);
    }

    #{$this}__svg {
      transform: translateX(- .4rem);
      stroke: color(orange);
      width: 1.5rem;
    }

    #{$this}__label {
      color: color(orange);
    }
  }

  &__button {
    position: relative;
    padding: .9rem 1rem;
    background: none;
    border: none;

    &::before {
      content: '';
      display: block;
      @include position(absolute, $t: 0, $l: 0);
      width: 3rem;
      height: 3rem;
      border-radius: radius(circle);
      background-color: color(orange);
      transition: left .3s ease, background-color .3s ease;
    }
  }

  &__label {
    position: relative;
    font: bold 1rem/1 Arial;
    letter-spacing: 1.2px;
    color: color(white);
    transition: color .3s ease;
  }

  &__svg {
    width: 1rem;
    height: 1.5rem;
    position: relative;
    top: 0;
    margin-left: 1.5rem;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: color(white);
    stroke-width: 2;
    transform: translateX(0);
    transition: transform .3s ease, stroke .3s ease, width .3s ease;
  }
}
</style>
