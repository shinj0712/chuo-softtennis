<template>
  <div class="site-wrapper">
    <Header />

    <main class="main">
      <NuxtPage />

      <!-- Twitterボタン -->
      <transition name="fade-x">
        <button class="tweet-button__button" @click="toggleTwitter" v-show="!showTwitter">
          <span class="tweet-button__text">投稿を見る</span>
          <div class="tweet-button__logo">
            <nuxt-svg :svg="TwitterLogo" color="twitter"/>
          </div>
        </button>
      </transition>

      <!-- コンテンツ -->
      <transition name="fade-y">
        <article class="tweet-contents__container" v-show="showTwitter">
          <header class="tweet-contents__header">
            <h5 class="tweet-contents__title">直近の3投稿</h5>
            <button class="tweet-contents__close" @click="toggleTwitter">
              <nuxt-svg :svg="closeIcon" color="navy"/>
            </button>
          </header>
          <div class="tweet-contents__wrapper">
            <!-- 埋め込みタグ -->
            <a
              class="twitter-timeline"
              data-lang="ja"
              data-theme="light"
              data-tweet-limit="3"
              data-chrome="noheader nofooter transparent noborders"
              href="https://twitter.com/chuosofttennis?ref_src=twsrc%5Etfw"
            />
          </div>
          <footer>
            <NuxtLink :to="constants.twitter.home" class="tweet-contents__link" :external="true" target="_blank">
              <span class="twitter__link-text">もっと見る</span>
            </NuxtLink>
          </footer>
        </article>
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import TwitterLogo from "@/assets/svg/twitter.svg?component";
import closeIcon from "@/assets/svg/close.svg?component";

const config = useRuntimeConfig();

const siteDescription = '中央大学ソフトテニス部白門会の公式ホームページです。選手紹介やクラブ紹介をコンテンツとして公開しています。';

useHead({
  titleTemplate: (title: string) => {
    return title ? `${title} - ${config.public.appName}` : config.public.appName;
  },
  meta: [
    {
      name    : 'description',
      content : siteDescription
    },
    {
      name    : 'keyword',
      content : '中央大学,ソフトテニス,中央大学ソフトテニス部,ソフトテニス部,日本ソフトテニス連盟,関東ソフトテニス連盟'
    },
    {
      property: 'og:site_name',
      content : config.public.appName
    },
    {
      property: 'og:type',
      content : 'website'
    },
    {
      property: 'og:url',
      content : '/'
    },
    {
      property: 'og:description',
      content : siteDescription
    },
    {
      property: 'og:image',
      content : ''
    },
    {
      name    : 'twitter:card',
      content : 'summary'
    },
    {
      name    : 'twitter:site',
      content : '@chuosofttennis'
    },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  script: [
    { src: 'https://platform.twitter.com/widgets.js', charset: 'utf-8', async: '' }
  ]
})

const { constants } = useJson();

const showTwitter = ref(false);
const toggleTwitter = (): void => {
  showTwitter.value = !showTwitter.value;
}
</script>

<style ${2|scoped,|} lang="scss">
* {
  font-size: 1rem;
}

html {
  font-size: clamp(0.875rem, 0.75vw + 0.5rem, 1.5rem);
}

body {
  width: 100%;
  color: color(white);
  font: 1rem/1.5 arial;
  overflow-x: hidden;
}

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

.container {
  width: auto;
  max-width: none;
  margin-right: - 5vw;
  margin-left: - 5vw;
}

// swiper 共通スタイル
.swiper {
  padding-bottom: interval(10);

  &-button {
    $this: &;
    $size: 2.5rem;

    &-next,
    &-prev {
      width: $size;
      height: $size;
      border-radius: radius(circle);
      outline: none;
      transform: translateY(- 1.25rem);

      &::after {
        content: '';
      }
    }

    &-next {
      right: .5rem;
    }

    &-prev {
      left: .5rem;
    }

    &-disabled {
      opacity: 0;
    }
  }

  &-pagination {
    $this: &;
    counter-reset: num;

    &-bullet {
        $size: 3rem;
        counter-increment: num;
        width: $size;
        height: $size;
        background-color: color(white);
        box-shadow: inset -.15rem -.15rem .7rem color(darkShadow);
        border-radius: radius(circle);
        position: relative;
        opacity: .5;
        transition: transform .3s ease-out, opacity .3s ease-out;

        &::before {
        display: block;
        content: '';
        position: absolute;
        top: calc(#{$size} / 4);
        left: 50%;
        transform: translateX(-50%);
        width: calc(#{$size} / 22);
        height: calc(#{$size} / 22);
        background-color: darken($color: blue, $amount: 10%);
        border-radius: radius(circle);
      }

      &::after {
        display: block;
        content: counter(num);
        font: bold .8rem/1 arial;
        white-space: pre;
        color: darken($color: red, $amount: .4);
        text-align: center;
        @include position(absolute, $t: 50%, $l: 50%);
        transform: translate(-50%, -50%);
      }
    }

    &-bullet-active {
      opacity: 1;
      transform: scale(1.1);
      animation: rotate-scale 3s linear normal infinite;
    }

    &-bullets-dynamic {
      #{$this}-bullet-active {
        animation: rotate-scale-small 3s linear normal infinite;
      }
    }
  }
}

.tweet-button {
  $button: &;

  &__button {
    @include flex(row nowrap, center, center, interval(1));
    @include position(fixed, $b: 5%, $l: -5.5rem, $z: z-index(max));
    background-color: color(twitter);
    border-radius: 0 1000px 1000px 0;
    padding: interval(1) interval(1) interval(1) interval(5);
    transition: left .3s ease-out;

    @include hover {
      left: 0;

      .tweet-button__text {
        color: color(white);
        transform: translate3d(0, 0, 0);
      }
    }
  }

  &__text {
    color: color(twitter);
    font: bold 1rem/1.2 arial;
    transform: translate3d(- interval(2), 0, interval(2));
    transition: color .3s ease-out, transform .3s ease-out;
  }

  &__logo {
    background-color: color(white);
    border-radius: radius(circle);
    padding: interval(1.5);
    width: 3rem;
  }
}

.tweet-contents {
  &__container {
    width: 21rem;
    @include position(fixed, $b: 5%, $l: 2.5%, $z: z-index(max));
    background-color: color(white);

    @include mq(sm) {
      width: 25rem;
      left: 5%;
    }

    @include mq(md) {
      width: 25rem;
    }
  }

  &__header {
    @include flex(row nowrap, space-between, center);
    pointer-events: none;
    border-bottom: 1px solid darken($color: color(lightgray), $amount: 5%);
    background-color: color(lightgray);
  }

  &__title {
    color: color(darkblue);
    font: bold 1.2rem/1.2 arial;
    margin: 0 interval(2);
  }

  &__close {
    width: 3rem;
    padding: interval(1.5);
    border: none;
    pointer-events: auto;
    cursor: pointer;
  }

  &__wrapper {
    width: 100%;
    max-height: 30rem;
    overflow: hidden scroll;
    margin: 0 auto;
  }

  &__link {
    display: block;
    position: relative;
    text-align: center;
    font: bold 1rem/1.5 arial;
    letter-spacing: 1.2px;
    text-decoration: none;
    padding: interval(2) interval(5);
    background-color: color(twitter);
    transition: background-color .3s ease-out;

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

    span {
      color: color(white);
      transition: opacity .3s ease-out;
    }

    @include hover {
      color: color(white);

      span {
        opacity: 0;
      }

      &::before {
        transform: translate(0);
        opacity: 1;
      }
    }
  }
}

// Vueトランジションクラス
.fade-x {
  &-enter-active {
    transition: transform .5s ease-out .5s, opacity .5s ease-out .5s;
  }

  &-leave-active {
    transition: transform .3s ease-out, opacity .3s ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-10%);
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-y {
  &-enter-active {
    transition: transform .5s ease-out .5s, opacity .5s ease-out .5s;
  }

  &-leave-active {
    transition: transform .3s ease-out, opacity .3s ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(10%);
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
