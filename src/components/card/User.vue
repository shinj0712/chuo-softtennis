<template>
  <div class="user-card" @click="openModal">
    <figure class="user-card__image">
      <Image :src="{ default: `users/${user.img.src}` }" :alt="user.img.alt" radius="normal" aspect="square"/>
      <div class="user-card__tags">
        <div class="user-card__tag" v-for="tag in user.tags">
          {{ tag }}
        </div>
      </div>
    </figure>
    <div class="user-card__contents">
      <div class="user-card__name">
        <span class="user-card__name-ja">{{ user.name_ja }}</span>
        <span class="user-card__name-en">{{ user.name_en }}</span>
      </div>
    </div>
    <!-- modal -->
    <modal-member :open="isShowRef" :member="user" @close="closeModal"/>
  </div>
</template>

<script lang="ts" setup>
import { Member } from "@/types/members";

interface Props {
  user: Member;
}

const { user } = defineProps<Props>();
const { isShowRef, closeModal, openModal } = useModal();
</script>

<style ${2|scoped,|} lang="scss">
.user-card {
  $this: &;
  background-color: color(white);
  border-radius: radius(normal);
  padding: interval(1);
  cursor: pointer;

  @include hover {
    #{$this}__image img {
      transform: scale(1.2);
    }
  }

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
