<template>
  <header class="header" :class="navCloseClass">
    <nav class="header__nav">
      <ul class="header__list">
        <!-- ホーム -->
        <li class="header__item">
          <NuxtLink to="/" class="header__button">
            <nuxt-svg :svg="Home" color="orange"/>
          </NuxtLink>
        </li>
        <!-- メニュー -->
        <li class="header__item">
          <button class="header__button" @click="openModal">
            <nuxt-svg :svg="Menu" color="orange"/>
          </button>
        </li>
        <!-- ダイレクトメッセージ -->
        <li class="header__item">
          <NuxtLink :to="constants.twitter.dm" class="header__link" target="__blank" :external="true">
            <nuxt-svg :svg="Send" color="orange"/>
          </NuxtLink>
        </li>
        <!-- 外部リンク -->
        <li class="header__item">
          <button class="header__button" @click="navToggle">
            <template v-if="navOpen">
              <nuxt-svg :svg="Small" color="orange"/>
            </template>
            <template v-else>
              <nuxt-svg :svg="Panel" color="orange"/>
            </template>
          </button>
        </li>
      </ul>

      <!-- サイトマップモーダル -->
      <modal
        :open="isShowRef"
        @close="closeModal"
        :scroll="true"
        color="white"
        background-color="darkblue"
        close-btn-color="white"
      >
        <ul class="header__sitemap-list">
          <li class="header__sitemap-item" v-for="route in routeList">
            <NuxtLink :to="route.path" class="header__sitemap-link" @click="next(route.path)">
              {{ (route.name === 'index') ? 'home' : route.name }}
            </NuxtLink>
          </li>
        </ul>
      </modal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Menu from "@/assets/svg/menu.svg?component";
import Send from "@/assets/svg/send.svg?component";
import Small from "@/assets/svg/south_east.svg?component";
import Home from "@/assets/svg/home.svg?component";
import Panel from "@/assets/svg/panel.svg?component";

const routeList = useRouteList();
const router = useRouter();
const { constants } = useJson();

// グロナビ開閉
const navOpen = ref(false);
const navCloseClass = computed<string>(() => (navOpen.value) ? '' : 'header__close');
const navToggle = (): void => {
  navOpen.value = !navOpen.value;
};

// サイトマップモーダル
const { isShowRef, closeModal, openModal } = useModal();

const next = (path: string): void => {
  // モーダルを閉じる
  closeModal();
  // ページ遷移
  router.push(path);
}
</script>

<style ${2|scoped,|} lang="scss">
.header {
  $this: &;
  @include position(fixed, $b: 5%, $r: 5%, $z: z-index(header));
  transition: right .5s ease-out, transform .5s ease-out;

  &__nav {
    background-color: rgba($color: color(white), $alpha: .6);
    padding: interval(1);
    border-radius: 1000px;
    transition: background-color .3s ease-out;
  }

  &__list {
    @include flex(column nowrap, center, center, interval(2));
    text-decoration: none;
    margin: 0;
  }

  &__item {
    width: 4rem;
    height: 4rem;
    display: grid;
    place-items: center;
    transition: transform .5s ease-out;
    position: relative;

    &:last-child {
      z-index: z-index(over);
    }
  }

  &__button,
  &__link {
    display: block;
    width: 100%;
    padding: interval(2);
    background-color: color(white);
    border-radius: radius(circle);
    border: 2px solid color(orange);
    transition: background-color .3s linear;

    @include hover {
      background-color: color(orange);

      & svg {
        fill: color(white);
      }
    }
  }

  &__close {
    right: 5%;
    transform: translate(0);

    #{$this}__nav {
      background-color: transparent;
    }

    #{$this}__item {
      @for $i from 1 to 5 {
        &:nth-of-type(#{$i}) {
          transform: translateY(calc((interval(2) + 4rem) * (4 - $i)));
        }
      }
    }
  }

  &__sitemap-list {
    @include flex(column nowrap, center, center, interval(5));
    width: 100%;
    padding: interval(5) 0;
  }

  &__sitemap-item {
    width: 80%;
    height: 20vw;
    background-color: rgba($color: color(white), $alpha: .5);
    transform: skew(- 20deg);

    @include mq(md) {
      height: 15vw;
    }
  }

  &__sitemap-link {
    @include flex(row, center, center);
    width: 100%;
    height: 100%;
    position: relative;
    font: bold 1.5rem/1 arial;
    letter-spacing: 1.2px;
    text-decoration: none;
    text-transform: uppercase;
    color: color(lightgray);
    border: interval(.5) solid color(lightgray);
    background-color: rgba($color: color(navy), $alpha: .5);
    overflow: hidden;
    cursor: pointer;
    transition: color .3s ease-out, border-color .3s ease-out, background-color .3s ease-out;

    &::before {
      content: '';
      @include position(absolute, $t: 50%, $l: 50%, $z: -1);
      transform: translate(-50%, -50%);
      background-image: url('@/assets/images/group01_2017.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-blend-mode: luminosity;
      width: 100%;
      height: 100%;
      filter: blur(3px);
    }

    @include hover {
      background-color: rgba($color: color(lightgray), $alpha: .5);
      border-color: color(orange);
      color: color(orange);
    }
  }
}
</style>
