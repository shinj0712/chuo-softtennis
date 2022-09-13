<template>
  <div class="tab">
    <div class="tab__tab-group">
      <div class="tab__tab" v-for="item in items" @click="change(item.id)" :class="{ 'active': currentId === item.id }">
        <input type="radio" :value="item.id" class="tab__radio" v-model="currentId">
        <label class="tab__label" :for="item.title.en">{{ item.title.en.toUpperCase() }}</label>
      </div>
    </div>
    <ul class="tab__list">
      <transition :name="transition">
        <li class="tab__item" :key="currentId" v-show="currentId">
          <span class="tab__keyword">{{ current.keyword }}</span>
          <p class="tab__text">{{ current.text }}</p>
        </li>
      </transition>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useWindow } from '../../composables/window';

// ウィンドウ共通情報
const { responsiveDevice } = useWindow();

interface Item {
  id: number;
  keyword: String;
  text: String;
  title: {
    ja: string;
    en: string;
  };
}

interface Props {
  items: Item[],
}

const { items } = defineProps<Props>();
const currentId = ref<number>(1);
const transition = ref<string>('');

// itemsから{currentId}番目の要素を返す
const current = computed<Item>(() => {
  const item = items.find(el => el.id === currentId.value);
  if (item == null) throw new Error("Failed to get tab content");
  return item;
});

// タブ押下でコンテンツを切り替えます
const change = (id: number): void => {
  if (responsiveDevice.value === 'sp') {
    (currentId.value > id) ? transition.value = 'prev' : transition.value = 'next';
  } else {
    (currentId.value > id) ? transition.value = 'up' : transition.value = 'down';
  }
  currentId.value = id;
}

defineExpose({
  change,
})
</script>

<style ${2|scoped,|} lang="scss">
.tab {
  color: color(white);
  background-color: color(darkblue);
  border-radius: radius(soft);

  @include mq(sm) {
    @include flex();
  }

  &__tab-group {
    @include flex();

    @include mq(sm) {
      flex-direction: column;
      width: 30%;
    }
  }

  &__tab {
    background-color: color(navy);
    @include flex(row nowrap, center, center);
    padding: interval(2);
    width: calc(100% / 3);
    border-radius: radius(soft);
    border-right: 1px solid rgba($color: color(white), $alpha: .2);

    &:last-child {
      border: none;
    }

    @include mq(sm) {
      height: calc(100% / 3);
      border-right: none;
      border-bottom: 1px solid rgba($color: color(white), $alpha: .2);
      width: 100%;
    }

    @include mq(md) {
      cursor: pointer;
    }
  }

  &__radio {
    display: none;
  }

  &__label {
    font: bold .8rem/1 arial;
  }

  &__list {
    border-radius: radius(soft);
    margin: 0;

    @include mq(sm) {
      width: 70%;
    }
  }

  &__item {
    padding: interval(2);
    transform: translate(0, 0);
  }

  &__keyword {
    font: bold 1.2rem/2 arial;
    display: block;
    margin-bottom: interval(3);

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: color(white);
    }
  }

  &__text {
    font: normal .9rem/1.5 arial;
    letter-spacing: 1.5px;
    color: color(white);
    margin: 0;
  }

  .active {
    background-color: color(darkblue);
  }
}

// トランジションアニメーション
.next {
  &-enter-active {
    transition: transform .6s ease-out, opacity .5s ease-out;
  }

  &-enter-from {
    transform: translateX(50%);
    opacity: 0;
  }
}

.prev {
  &-enter-active {
    transition: transform .6s ease-out, opacity .5s ease-out;
  }

  &-enter-from {
    transform: translateX(-50%);
    opacity: 0;
  }
}

.up {
  &-enter-active {
    transition: transform .6s ease-out, opacity .5s ease-out;
  }

  &-enter-from {
    transform: translateY(-50%);
    opacity: 0;
  }
}

.down {
  &-enter-active {
    transition: transform .6s ease-out, opacity .5s ease-out;
  }

  &-enter-from {
    transform: translateY(50%);
    opacity: 0;
  }
}
</style>
