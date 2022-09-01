<template>
  <div class="user-ticket">
    <div class="user-ticket__thumbnail">
      <image-thumbnail :img="user.img" :color="getBorderColor(user.position)"/>
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
  </div>
</template>

<script lang="ts" setup>
import { Member, Position } from "@/types/interface";
interface Props {
  user: Member;
}
const { user } = defineProps<Props>();
const getBorderColor = (position: Position | null): string => (position != null) ? position.color : 'blue';
</script>

<style ${2|scoped,|} lang="scss">
.user-ticket {
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
    box-shadow: 0 3px 5px 3px color(shadow);
    transform: translateY(-2px);
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
