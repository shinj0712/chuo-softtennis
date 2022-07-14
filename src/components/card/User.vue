<template>
  <div class="user-card">
    <figure class="user-card__image">
      <Image :src="{ default: item.img.src }" :alt="item.img.alt" radius="normal" aspect="square"/>
    </figure>
    <div class="user-card__contents">
      <div class="user-card__name">
        <span class="user-card__name-ja">{{ item.name_ja }}</span>
        <span class="user-card__name-en">{{ item.name_en }}</span>
      </div>
      <div class="user-card__tags">
        <div class="user-card__tag" v-for="tag in item.tags">
          {{ tag.name_ja }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Image {
  src: string;
  alt: string;
}
interface Position {
  name_ja: string;
  name_en: string;
  color: string;
}
interface Prefecture {
  name_ja: string;
  name_en: string;
}
interface Tag {
  id: number;
  name_ja: string;
  name_en: string;
}
interface User {
  id           : number;
  name_ja      : string;
  name_en      : string;
  graduate_date: null|number;
  alma_mater   : null|string;
  affiliation  : null|string;
  grade        : null|number;
  achievement  : null|string;
  img          : Image,
  prefecture   : Prefecture;
  position     : Position;
  tags         : Tag[]
}

interface Props {
  item: User;
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
  &__tags {
    @include flex(row wrap, flex-start, stretch, interval(1));
    margin-top: interval(2);
  }
  &__tag {
    color: color(white);
    border-radius: radius(hard);
    background-color: color(navy);
    padding: interval(1) interval(1.5);
    font: bold .9rem/1 arial;
    letter-spacing: 1.2px;
  }
}
</style>
