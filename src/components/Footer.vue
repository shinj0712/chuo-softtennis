<template>
  <footer class="footer">
    <div class="footer__container">
      <figure class="footer__logo">
        <nuxt-svg :svg="Logo" color="navy"/>
      </figure>
      <div class="footer__item">
        <h5 class="footer__title">MENU</h5>
        <ul class="footer__menus">
          <li class="footer__menu" v-for="route in routeList">
            <NuxtLink :to="route.path" :external="false" class="footer__menu-link">
              {{ convertRouteNameJa(route.name) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <h5 class="footer__title">CONTACT</h5>
        <NuxtLink :to="constants.twitter.home" class="footer__link footer__link--twitter" :external="true" target="_blank">
          <span class="footer__link-text">{{ firstUpperCase(constants.twitter.name) }}</span>
        </NuxtLink>
      </div>
    </div>
    <p class="footer__copyright">@ Chuo University Soft Tennis Team</p>
  </footer>
</template>

<script setup lang="ts">
import Logo from "@/assets/svg/hakumonkai-logo.svg?component";

const { constants } = useJson();
const routeList = useRouteList();

// 文字列の先頭を大文字にする
const firstUpperCase = (string: string): string => string.replace(/^./, string[0].toUpperCase());

/**
 * ルートネームを日本語に変換します
 * @param {string} name route name
 * @return {string} name_ja
 */
const convertRouteNameJa = (name: any): string => {
  if (typeof name !== 'string') return '';
  return constants.routeNameConvertList.find(e => e.name === name)?.name_ja || '';
}
</script>

<style ${2|scoped,|} lang="scss">
.footer {
  $this: &;
  color: color(darkblue);
  background-color: color(lightgray);

  @include mq(md) {
    #{$this}__container {
      display: grid;
      grid-template-rows: 100% 100% 100%;
      grid-template-columns: 40% 30% 30%;
    }

    #{$this}__logo {
      margin: 0;
    }

    #{$this}__item {
      margin: interval(3) 0 0 0;
    }

    #{$this}__menus,
    #{$this}__menu {
      border: 0;
    }
  }

  &__container {
    @include flex(column nowrap, flex-start, stretch);
    padding: interval(1) 5vw;
  }

  &__logo {
    width: 20rem;
    margin: 0 auto;
  }

  &__title {
    font: bold 1.2rem/1.2 arial;
    padding: interval(1) 0;
  }

  &__item {
    margin-bottom: interval(5);
  }

  &__menus {
    @include flex(column nowrap, flex-start, stretch, interval(1));
    margin-top: interval(1);
    margin: 0;
    border-top: 1px solid darken($color: color(lightgray), $amount: 10%);
  }

  &__menu {
    border-bottom: 1px solid darken($color: color(lightgray), $amount: 10%);

    &-link {
      display: block;
      font: 700 1rem/1 arial;
      color: color(darkblue);
      text-decoration: none;
      width: 100%;
      padding: interval(1.5) 0;
      transition: color .3s ease-out;

      @include hover {
        color: rgba($color: color(navy), $alpha: .6);
      }
    }
  }

  &__link {
    display: block;
    position: relative;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    background-color: color(navy);
    font: bold 1rem/1.5 arial;
    letter-spacing: 1.2px;
    padding: interval(2) interval(5);
    transition: background-color .3s ease-out;

    &-text {
      color: color(white);
      transition: opacity .3s ease-out;
    }

    &--twitter {
      &::before {
        content: '';
        display: inline-block;
        background: url('@/assets/svg/twitter-white.svg') center/contain no-repeat;
        width: 2rem;
        height: 2rem;
        @include position(absolute, $t: calc(50% - 1rem), $l: calc(50% - 1rem));
        transform: translate(- 5rem);
        opacity: 0;
        transition: transform .3s ease-out, opacity .3s ease-out;
      }

      @include hover {
        color: color(white);
        background-color: color(twitter);

        #{$this}__link-text {
          opacity: 0;
        }

        &::before {
          transform: translate(0);
          opacity: 1;
        }
      }
    }
  }

  &__copyright {
    font: normal .8rem/1 arial;
    text-align: center;
  }
}
</style>
