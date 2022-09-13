<template>
  <div class="user-ticket" @click="openModal">
    <div class="user-ticket__thumbnail">
      <image-thumbnail :img="user.img" :color="user.position?.color ?? 'blue'"/>
    </div>

    <div class="user-ticket__content">
      <slot name="content" :user="user">
        <!-- 名前 -->
        <div class="user-ticket__name">
          <h4 class="user-ticket__name-ja">{{ user.name_ja }}</h4>
          <h5 class="user-ticket__name-en">{{ user.name_en }}</h5>
        </div>
        <!-- タグ -->
        <div class="user-ticket__tags">
          <tag :text="tag" v-for="tag in user.tags"/>
        </div>
      </slot>
    </div>

    <!-- modal -->
    <modal-member v-if="isShowRef" :member="user" @close="closeModal"/>
  </div>
</template>

<script lang="ts" setup>
// types
import { Member } from "@/types/members";

// interface
interface Props {
  user: Member;
}

// props
const { user } = defineProps<Props>();

// modal composable
const { openModal, closeModal, isShowRef } = useModal();
</script>

<style ${2|scoped,|} lang="scss">
.user-ticket {
  $this: &;
  @include flex(row nowrap, flex-start, center, interval(4));
  background-color: color(white);
  box-shadow: 0 1px 3px 1px color(darkShadow);
  border-radius: 1000px;
  padding: interval(1);

  @include mq(md) {
    cursor: pointer;
    transition: all .3s ease-out;
  }

  @include hover {
    box-shadow: 0 2px 5px 1px color(darkShadow);
    transform: translateY(-2px);

    #{$this}__thumbnail {
      img {
        overflow: hidden;
        transform: scale(1.2);
      }
    }
  }

  &__thumbnail {
    width: 6rem;
  }

  &__name {
    color: color(darkblue);

    &-ja {
      font: bold 1rem/1 arial;
    }
    &-en {
      font: normal .9rem/1 arial;
    }
  }

  &__tags {
    @include flex(row wrap, flex-start, stretch, interval(1));
  }
}
</style>
