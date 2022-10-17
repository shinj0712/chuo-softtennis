<template>
  <div class="home">
    <!-- メインビジュアル -->
    <section class="main-visual container">
      <div class="main-visual__circle"/>
      <h1 class="main-visual__title">
        CHUO<br>
        UNIVERSITY<br>
        SOFT<br>
        TENNIS<br>
      </h1>
    </section>

    <!-- メニューパネル -->
    <section class="panel container">
      <ul class="panel__list">
        <li class="panel__item" v-for="menu in contents.panels">
          <Image :src="{ default: menu.img }" :alt="menu.alt" aspect="square"/>
          <div class="panel__content">
            <h3 class="panel__title">{{ menu.title }}</h3>
            <h4 class="panel__lead">{{ menu.leadText }}</h4>
          </div>
          <div class="panel__button">
            <button-link label="view more" :link="menu.link" position="right-bottom"/>
          </div>
        </li>
      </ul>
    </section>

    <!-- サポートメッセージ -->
    <section class="support container">
      <div class="support__wrapper">
        <title-primary :title="{ ja: 'サポート', en: 'support' }" color="white"/>
        <p class="support__text">
          中央大学ソフトテニス部は、古くから様々な関係者にご支援をいただいております。<br>
          皆様の手厚いサポートのおかげでソフトテニスに100%コミットできる環境づくりと円滑な部活動運営が可能になっています。各関係者様の多大なサポートと協力に感謝し、ソフトテニスに真摯に向き合い、常に謙虚な姿勢を忘れずに活動して参ります。
        </p>
      </div>
    </section>

    <!-- スポンサー -->
    <section class="sponsor">
      <ul class="sponsor__list">
        <li class="sponsor__item">
          <nuxt-link class="sponsor__link" :to="constants.link.yonex" target="_blank" :external="true">
            <img src="@/assets/images/sponsor/yonex.png" alt="ヨネックス株式会社" class="sponsor__image">
          </nuxt-link>
        </li>
        <li class="sponsor__item">
          <nuxt-link class="sponsor__link" :to="constants.link.mizuno" target="_blank" :external="true">
            <img src="@/assets/images/sponsor/mizuno.png" alt="美津濃株式会社" class="sponsor__image">
          </nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// TODO:meta情報
useHead({
  title: 'ホーム',
})

// JSON定数を取得
const { contents, constants } = useJson();
</script>

<style ${2|scoped,|} lang="scss">
.home {
  // メインビジュアルレイアウト
  .main-visual {
    height: 100vh;
    position: relative;
    @include gradient(color(navy), color(darkblue));
    display: grid;
    place-items: center;

    &__circle {
      width: pixel(30);
      height: pixel(30);
      background: radial-gradient(circle, color(lightgray), rgba(color(navy), 0));
      filter: blur(pixel(20));
      @include position(absolute, $t: 50%);
      transform: translateY(- 50%);
    }

    &__title {
      font: bold 3rem/1 arial;
      letter-spacing: 1.5px;
      text-shadow: 3px 3px 0px color(orange);
    }
  }

  // パネルレイアウト
  .panel {
    margin-top: interval(10);

    @include mq(md) {
      padding: 0 5vw;
    }

    &__list {
      max-width: pixel(200);
      margin: 0 auto;

      @include mq(sm) {
        @include flex(row wrap, flex-start, center, 1px);
      }
    }

    &__item {
      position: relative;
      width: 100%;
      border-bottom: 1px solid color(white);
      background-color: rgba($color: color(navy), $alpha: 0);

      @include mq(sm) {
        width: calc(100% / 2 - 0.5px);
      }

      @include mq(md) {
        width: calc(100% / 3 - 1px);
      }
    }

    &__content {
      @include position(absolute, $t: 0, $l: 0);
      @include flex(column nowrap, center, stretch);
      width: 100%;
      height: 100%;
      padding: 0 5vw;
      background: linear-gradient(45deg, rgba(color(darkblue), .9) 10%, rgba(lighten(color(navy), 10%), .7) 53%, rgba(color(navy), .7) 80%);
    }

    &__title {
      font: bold 2.5rem/1 'bangers';
      letter-spacing: 3px;
    }

    &__lead {
      font: bold .9rem/1.5 arial;
      letter-spacing: 1.2px;
    }

    &__button {
      width: 100%;
      height: 100%;
      @include position(absolute, $b: 0, $r: 0);
    }
  }

  // サポートセクション
  .support {
    margin-top: interval(10);
    @include blur(.5rem, url('@/assets/images/support_pc.jpg') no-repeat center center/cover);

    &__wrapper {
      width: 100%;
      @include flex(column nowrap, center, center);
      background: linear-gradient(135deg, rgba(color(darkblue), .9) 10%, rgba(lighten(color(navy), 10%), .7) 53%, rgba(color(navy), .7) 80%);
      padding: interval(5) 5vw;
    }

    &__text {
      font: normal 1rem/1.5 'zen';
      letter-spacing: 1.2px;
      max-width: pixel(100);
      margin: interval(5) auto;
    }
  }

  // スポンサー
  .sponsor {
    $this: &;
    margin: interval(10) 0;

    &__list {
      @include flex(row nowrap, center, center, interval(4));
      margin: 0;
    }

    &__link {
      display: block;
      padding: .5rem;

      @include mq(sm) {
        padding: 1rem;
      }

      @include hover {
        #{$this}__image {
          transform: scale(1.1);
        }
      }
    }

    &__image {
      mix-blend-mode: multiply;
      object-fit: contain;
      width: auto;
      height: 2.5rem;
      transform: scale(1);
      transition: transform .3s ease;

      @include mq(sm) {
        height: 3rem;
      }
    }
  }
}
</style>
