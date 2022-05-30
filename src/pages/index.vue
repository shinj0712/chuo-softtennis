<template>
  <!-- メインビジュアル -->
  <section class="main-visual container">
    <div class="main-visual__circle"/>
    <h1 class="main-visual__title">
      CHUO<br>
      UNIVERSITY<br>
      SOFT<br>
      TENNIS<br>
    </h1>
  </section>
</template>

<script setup lang="ts">

</script>

<style ${2|scoped,|} lang="scss">
.main-visual {
  height: 100vh;
  position: relative;
  @include gradient(color(navy), color(darkblue));
  display: grid;
  place-items: center;

  &__circle {
    width: pixel(30);
    height: pixel(30);
    background: radial-gradient(circle, color(lightgray), rgba(color(navy), 0));
    filter: blur(pixel(20));
    @include position(absolute, $t: 50%);
    transform: translateY(- 50%);
  }

  &__title {
    @include fonts(font(40), bold, arial, 1, 1.5px);
    text-shadow: 3px 3px 0px color(orange);
  }
}

.news {

}
</style>
