<template>
  <div class="site-wrapper">
    <Header />

    <main class="main">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">

</script>

<style ${2|scoped,|} lang="scss">
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  overflow-x: hidden;
  padding: 0 5vw;
}

.container {
  width: auto;
  max-width: none;
  margin-right: - 5vw;
  margin-left: - 5vw;
}

// swiper 共通スタイル
.swiper {
  padding-bottom: interval(10);

  &-button {
    $this: &;
    $size: 2.5rem;

    &-next,
    &-prev {
      width: $size;
      height: $size;
      border-radius: radius(circle);
      outline: none;
      transform: translateY(- 1.25rem);

      &::after {
        content: '';
      }
    }

    &-next {
      right: .5rem;
    }

    &-prev {
      left: .5rem;
    }

    &-disabled {
      opacity: 0;
    }
  }

  &-pagination {
    $this: &;
    counter-reset: num;

    &-bullet {
        $size: 3rem;
        counter-increment: num;
        width: $size;
        height: $size;
        background-color: color(white);
        box-shadow: inset -.15rem -.15rem .7rem color(darkShadow);
        border-radius: radius(circle);
        position: relative;
        opacity: .5;
        transition: transform .3s ease-out, opacity .3s ease-out;

        &::before {
        display: block;
        content: '';
        position: absolute;
        top: calc(#{$size} / 4);
        left: 50%;
        transform: translateX(-50%);
        width: calc(#{$size} / 22);
        height: calc(#{$size} / 22);
        background-color: darken($color: blue, $amount: 10%);
        border-radius: radius(circle);
      }

      &::after {
        display: block;
        content: counter(num);
        font: bold .8rem/1 arial;
        white-space: pre;
        color: darken($color: red, $amount: .4);
        text-align: center;
        @include position(absolute, $t: 50%, $l: 50%);
        transform: translate(-50%, -50%);
      }
    }

    &-bullet-active {
      opacity: 1;
      transform: scale(1.1);
      animation: rotate-scale 3s linear normal infinite;
    }

    &-bullets-dynamic {
      #{$this}-bullet-active {
        animation: rotate-scale-small 3s linear normal infinite;
      }
    }
  }
}
</style>
