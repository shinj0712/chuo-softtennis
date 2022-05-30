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
</style>
