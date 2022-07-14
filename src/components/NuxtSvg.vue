<template>
  <img :src="svgPath" :alt="`${name}のアイコン`" class="svg">
</template>

<script lang="ts" setup>
// TODO:Nuxt3が正式リリースされてSVGの便利なライブラリがでてきたら当該コンポーネントの構成を見直す
interface Props {
  name: string;
}
const { name } = defineProps<Props>();

const svgPath = computed<string>(() => `_nuxt/assets/svg/${name}.svg`);
</script>

<style ${2|scoped,|} lang="scss">
.svg {
  width: 100%;
}
</style>
