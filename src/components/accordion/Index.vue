<template>
  <div class="accordion" :class="coloring">
    <!-- トグルエリア -->
    <div class="accordion__toggle" @click="toggle">
      <i class="accordion__icon" :class="{ 'accordion__icon-active': openRef }">
        <span></span>
      </i>
      <h5 class="accordion__title">
        <slot name="title">
          <!-- 親コンポーネント側で指定する -->
        </slot>
      </h5>
    </div>

    <!-- コンテンツ -->
    <Transition name="accordion-transition">
      <div class="accordion__contents" v-show="openRef">
        <slot name="contents">
          <!-- 親コンポーネント側で指定する -->
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  initOpen?: boolean;
  color?: string;
}

const { initOpen = false, color = 'darkblue' } = defineProps<Props>();

// 開閉フラグ
const openRef = ref(initOpen);
// 開閉処理
const toggle = (): void => {
  openRef.value = !openRef.value;
}

// カスタムクラス
const coloring = computed<string>(() => `accordion--${color}`);
</script>

<style ${2|scoped,|} lang="scss">
.accordion {
  width: 100%;
  $this: &;

  &--darkblue {
    #{$this}__toggle {
      background-color: color(darkblue);
    }

    #{$this}__icon {
      background-color: color(white);

      span::before, span::after {
        background-color: color(darkblue);
      }
    }

    #{$this}__contents {
      background-color: color(lightgray);
      color: color(darkblue);
    }
  }

  &__toggle {
    @include flex(row nowrap, flex-start, center);
    border-radius: radius(normal);
    width: 100%;
    padding: interval(1.5) interval(2);
    cursor: pointer;
  }

  &__icon {
    border-radius: radius(circle);
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;

    span {
      display: block;
      position: relative;
      width: 50%;

      &::before, &::after {
        content: '';
        display: block;
        width: 100%;
        height: 3px;
        border-radius: 1000px;
        @include position(absolute);
      }

      &::after {
        transform: rotate(90deg);
        transition: transform .3s ease-out;
      }
    }

    &-active span::after {
      transform: rotate(0);
      transition: transform .3s ease-out;
    }
  }

  &__title {
    margin: 0 0 0 interval(5);
    font: bold 1rem/1 arial;
  }

  &__contents {
    padding: interval(2);

    & > * {
      line-height: 1.5;
      visibility: visible;
      opacity: 1;
      padding: 0;
    }
  }

  // vue transition
  &-transition {
    &-enter-active, &-leave-active {
      transition: padding-top .3s ease-out, padding-bottom .3s ease-out;
    }

    &-enter-active > * {
      transition: line-height .3s ease-out, opacity .1s linear .1s, visibility .1s linear .1s;
    }

    &-leave-active > * {
      transition: line-height .3s ease-out, opacity .1s linear, visibility .1s linear;
    }

    &-enter-from, &-leave-to {
      padding-top: 0;
      padding-bottom: 0;

      & > * {
        line-height: 0;
        opacity: 0;
      }
    }
  }
}
</style>
