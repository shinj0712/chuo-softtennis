<template>
  <div class="user-card">
    <figure class="user-card__image">
      <Image :src="{ default: `users/${item.img.src}` }" :alt="item.img.alt" radius="normal" aspect="square"/>
      <div class="user-card__tags">
        <div class="user-card__tag" v-for="tag in item.tags">
          {{ tag }}
        </div>
      </div>
    </figure>
    <div class="user-card__contents">
      <div class="user-card__name">
        <span class="user-card__name-ja">{{ item.name_ja }}</span>
        <span class="user-card__name-en">{{ item.name_en }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Member } from "@/types/members";

interface Props {
  item: Member;
}

const { item } = defineProps<Props>();
</script>

<style ${2|scoped,|} lang="scss">
.user-card {
  $this: &;
  background-color: color(white);
  border-radius: radius(normal);
  padding: interval(1);
  cursor: pointer;

  &__image {
    width: 100%;
    background-color: color(white);
    position: relative;
  }
  &__tags {
    @include position(absolute, $l: interval(1), $t: interval(1));
    @include flex(row wrap, flex-start, stretch, interval(1));
  }
  &__tag {
    color: color(white);
    border-radius: radius(hard);
    background-color: color(navy);
    padding: interval(1) interval(1.5);
    font: bold .9rem/1 arial;
    letter-spacing: 1.2px;
  }
  &__contents {
    color: color(darkblue);
    padding: interval(1) 0;
  }
  &__name {
    &-ja,
    &-en {
      display: block;
      margin-left: interval(.5);
    }
    &-ja {
      font: bold 1.2rem/1 arial;
    }
    &-en {
      margin-top: interval(.5);
      font: normal 1rem/1 arial;
      letter-spacing: 1px;
    }
  }
}
</style>
